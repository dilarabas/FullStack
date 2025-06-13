import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component', () => {
  // ... (önceki kodlar aynı)

  let container

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog} // Bu mock fonksiyonunu kullanacağız
        removeBlog={mockRemoveBlog}
        user={loggedInUser}
      />
    ).container
  })

  // ... (5.13 ve 5.14 testleri aynı)

  test('like button calls event handler twice when clicked twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton) // Detayları göstermek için view'a tıklayın

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2) // Fonksiyonun iki kez çağrıldığını kontrol edin
  })
})