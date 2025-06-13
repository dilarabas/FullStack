// tests/blog.spec.js
const { test, expect, beforeEach, describe } = require('@playwright/test');

// Test edilecek kullanıcı bilgileri
const USERNAME = 'testuser';
const PASSWORD = 'password';
const NAME = 'Test User';
const ANOTHER_USERNAME = 'anotheruser';
const ANOTHER_PASSWORD = 'anotherpassword';
const ANOTHER_NAME = 'Another User';

describe('Blog app', () => {
  // before each test, reset the database and create a user
  beforeEach(async ({ page, request }) => {
    // Reset the backend test database
    await request.post('http://localhost:3003/api/testing/reset');

    // Create the primary test user
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: USERNAME,
        name: NAME,
        password: PASSWORD,
      },
    });

    // Create another user for specific tests (e.g., 5.22)
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: ANOTHER_USERNAME,
        name: ANOTHER_NAME,
        password: ANOTHER_PASSWORD,
      },
    });

    // Navigate to the application's base URL
    await page.goto('/');
  });

  // 5.17: Ensure the login form is displayed by default
  test('Login form is shown', async ({ page }) => {
    // Check if the input field with label 'username' is visible
    await expect(page.getByLabel('username')).toBeVisible();
    // Check if the input field with label 'password' is visible
    await expect(page.getByLabel('password')).toBeVisible();
    // Check if a button with the text 'login' is visible
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  describe('Login', () => {
    // 5.18: Test successful login with correct credentials
    test('succeeds with correct credentials', async ({ page }) => {
      // Fill username and password fields
      await page.getByLabel('username').fill(USERNAME);
      await page.getByLabel('password').fill(PASSWORD);
      // Click the login button
      await page.getByRole('button', { name: 'login' }).click();

      // Verify that the user's name and logout button are visible
      await expect(page.getByText(`${NAME} logged in`)).toBeVisible();
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible();

      // Check for a success notification
      await expect(page.locator('.success')).toContainText(`Welcome, ${NAME}!`);
    });

    // 5.18: Test failed login with wrong credentials
    test('fails with wrong credentials', async ({ page }) => {
      // Fill with incorrect credentials
      await page.getByLabel('username').fill('wronguser');
      await page.getByLabel('password').fill('wrongpassword');
      // Click the login button
      await page.getByRole('button', { name: 'login' }).click();

      // Check for an error notification
      await expect(page.locator('.error')).toContainText('Wrong username or password');

      // Verify that the user's name is NOT visible (should still be on login form)
      await expect(page.getByText(`${NAME} logged in`)).not.toBeVisible();
      // Verify that the login form is still visible
      await expect(page.getByLabel('username')).toBeVisible();
    });
  });

  describe('When logged in', () => {
    // Log in before each test in this describe block
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill(USERNAME);
      await page.getByLabel('password').fill(PASSWORD);
      await page.getByRole('button', { name: 'login' }).click();
      await expect(page.getByText(`${NAME} logged in`)).toBeVisible(); // Ensure login is successful
    });

    // 5.19: Verify that a logged-in user can create a new blog
    test('a new blog can be created', async ({ page }) => {
      // Click the 'create new blog' button to show the form
      await page.getByRole('button', { name: 'create new blog' }).click();

      const blogTitle = 'A brand new test blog';
      const blogAuthor = 'Test Author';
      const blogUrl = 'http://testblog.com';

      // Fill out the blog creation form
      await page.getByLabel('title:').fill(blogTitle);
      await page.getByLabel('author:').fill(blogAuthor);
      await page.getByLabel('url:').fill(blogUrl);
      // Click the 'create' button to submit the form
      await page.getByRole('button', { name: 'create' }).click();

      // Check for a success notification
      await expect(page.locator('.success')).toContainText(`A new blog "${blogTitle}" by ${blogAuthor} added`);

      // Verify that the created blog is visible in the list (by title and author)
      await expect(page.getByText(`${blogTitle} ${blogAuthor}`)).toBeVisible();
    });

    // 5.20: Verify that a blog can be liked
    test('a blog can be liked', async ({ page }) => {
      // First, create a blog to like
      await page.getByRole('button', { name: 'create new blog' }).click();
      await page.getByLabel('title:').fill('Blog to be liked');
      await page.getByLabel('author:').fill('Likey McLikerson');
      await page.getByLabel('url:').fill('http://like.com');
      await page.getByRole('button', { name: 'create' }).click();
      await expect(page.getByText('Blog to be liked Likey McLikerson')).toBeVisible();

      // Click the 'view' button to show blog details
      // Use .locator() to find the specific blog item and then its view button
      const blogItem = page.locator(`.blog-item:has-text("Blog to be liked")`);
      await blogItem.locator('.view-button').click();

      // Get the likes div and verify initial likes (e.g., "likes 0")
      const likesDiv = blogItem.locator('.blog-likes');
      await expect(likesDiv).toContainText('likes 0');

      // Click the 'like' button
      await blogItem.locator('.like-button').click();

      // Verify that the like count has increased to 1
      await expect(likesDiv).toContainText('likes 1'); // Playwright waits for text to appear

      // Click again and verify it's 2
      await blogItem.locator('.like-button').click();
      await expect(likesDiv).toContainText('likes 2');

      // Optionally, check the success notification
      await expect(page.locator('.success')).toContainText('You liked "Blog to be liked"!');
    });

    // 5.21: Verify that the creator can delete a blog
    test('the creator can delete a blog', async ({ page }) => {
      const blogTitle = 'Blog to be deleted';
      const blogAuthor = 'Deletey McDeleter';
      const blogUrl = 'http://delete.com';

      // Create a blog first
      await page.getByRole('button', { name: 'create new blog' }).click();
      await page.getByLabel('title:').fill(blogTitle);
      await page.getByLabel('author:').fill(blogAuthor);
      await page.getByLabel('url:').fill(blogUrl);
      await page.getByRole('button', { name: 'create' }).click();
      await expect(page.getByText(`${blogTitle} ${blogAuthor}`)).toBeVisible();

      // Click the 'view' button to show blog details
      const blogItem = page.locator(`.blog-item:has-text("${blogTitle} ${blogAuthor}")`);
      await blogItem.locator('.view-button').click();

      // Listen for the dialog (window.confirm) and accept it
      page.on('dialog', async dialog => {
        expect(dialog.message()).toContain(`Remove blog "${blogTitle}" by ${blogAuthor}?`);
        await dialog.accept(); // Accept the confirmation dialog
      });

      // Click the 'remove' button
      await blogItem.locator('.delete-button').click();

      // Check for a success notification
      await expect(page.locator('.success')).toContainText('Blog successfully removed!');

      // Verify that the blog is no longer visible in the list
      await expect(page.getByText(`${blogTitle} ${blogAuthor}`)).not.toBeVisible();
    });

    // 5.22: Verify that only the creator sees the delete button
    test('only the creator sees the delete button', async ({ page }) => {
      const blogTitle = 'Blog by original user';
      const blogAuthor = 'Original Author';
      const blogUrl = 'http://original.com';

      // Create a blog as the primary user
      await page.getByRole('button', { name: 'create new blog' }).click();
      await page.getByLabel('title:').fill(blogTitle);
      await page.getByLabel('author:').fill(blogAuthor);
      await page.getByLabel('url:').fill(blogUrl);
      await page.getByRole('button', { name: 'create' }).click();
      await expect(page.getByText(`${blogTitle} ${blogAuthor}`)).toBeVisible();

      // Verify that the original user sees the delete button for their blog
      const originalUserBlogItem = page.locator(`.blog-item:has-text("${blogTitle}")`);
      await originalUserBlogItem.locator('.view-button').click(); // Show details
      await expect(originalUserBlogItem.locator('.delete-button')).toBeVisible();
      await originalUserBlogItem.locator('.hide-button').click(); // Hide details

      // Log out
      await page.getByRole('button', { name: 'logout' }).click();
      await expect(page.getByLabel('username')).toBeVisible(); // Ensure login form is back

      // Log in as the second user
      await page.getByLabel('username').fill(ANOTHER_USERNAME);
      await page.getByLabel('password').fill(ANOTHER_PASSWORD);
      await page.getByRole('button', { name: 'login' }).click();
      await expect(page.getByText(`${ANOTHER_NAME} logged in`)).toBeVisible();

      // Find the original user's blog as the second user
      const otherUserBlogItem = page.locator(`.blog-item:has-text("${blogTitle}")`);
      await otherUserBlogItem.locator('.view-button').click(); // Show details

      // Verify that the delete button is NOT visible for the second user
      await expect(otherUserBlogItem.locator('.delete-button')).not.toBeVisible();
      await otherUserBlogItem.locator('.hide-button').click(); // Hide details for cleanup

      // Optionally, create a blog with the second user and verify they *can* see its delete button
      await page.getByRole('button', { name: 'create new blog' }).click();
      await page.getByLabel('title:').fill('Blog by another user');
      await page.getByLabel('author:').fill('Another Author');
      await page.getByLabel('url:').fill('http://another.com');
      await page.getByRole('button', { name: 'create' }).click();
      await expect(page.getByText('Blog by another user Another Author')).toBeVisible();
      const anotherUserOwnBlog = page.locator(`.blog-item:has-text("Blog by another user")`);
      await anotherUserOwnBlog.locator('.view-button').click();
      await expect(anotherUserOwnBlog.locator('.delete-button')).toBeVisible();
    });

    // 5.23: Verify that blogs are ordered by likes, with most likes first
    test('blogs are ordered by likes, most likes first', async ({ page }) => {
      // Create three blogs with different like counts
      const blog1 = { title: 'Blog with 5 likes', author: 'Author A', url: 'http://a.com', likes: 5 };
      const blog2 = { title: 'Blog with 10 likes', author: 'Author B', url: 'http://b.com', likes: 10 };
      const blog3 = { title: 'Blog with 2 likes', author: 'Author C', url: 'http://c.com', likes: 2 };

      // Helper function to create a blog and like it multiple times
      const createAndLikeBlog = async (title, author, url, targetLikes) => {
        await page.getByRole('button', { name: 'create new blog' }).click();
        await page.getByLabel('title:').fill(title);
        await page.getByLabel('author:').fill(author);
        await page.getByLabel('url:').fill(url);
        await page.getByRole('button', { name: 'create' }).click();
        await expect(page.getByText(`${title} ${author}`)).toBeVisible(); // Wait for blog to appear

        // Open details to access like button
        const blogItem = page.locator(`.blog-item:has-text("${title} ${author}")`);
        await blogItem.locator('.view-button').click();

        // Click like button 'targetLikes' times
        for (let i = 0; i < targetLikes; i++) {
          await blogItem.locator('.like-button').click();
          // Adding a small delay or waiting for text change can help stabilize in some environments
          // await page.waitForTimeout(50); // Optional: add a small wait if tests are flaky
        }
        await expect(blogItem.locator('.blog-likes')).toContainText(`likes ${targetLikes}`);

        // Hide details to keep the UI clean
        await blogItem.locator('.hide-button').click();
      };

      // Create and like the blogs
      await createAndLikeBlog(blog1.title, blog1.author, blog1.url, blog1.likes);
      await createAndLikeBlog(blog2.title, blog2.author, blog2.url, blog2.likes);
      await createAndLikeBlog(blog3.title, blog3.author, blog3.url, blog3.likes);

      // Get all blog summary elements in their rendered order
      // Using .blog-summary to get the visible part of the blog items
      const blogTitlesAndAuthors = await page.locator('.blog-summary').allTextContents();

      // Verify the order based on expected likes (descending)
      // Expected order: Blog with 10 likes, Blog with 5 likes, Blog with 2 likes
      expect(blogTitlesAndAuthors[0]).toContain(blog2.title); // Most likes (10)
      expect(blogTitlesAndAuthors[1]).toContain(blog1.title); // Middle likes (5)
      expect(blogTitlesAndAuthors[2]).toContain(blog3.title); // Fewest likes (2)
    });
  });
});
