const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const listWithOneBlog = [
      {
        _id: '1',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://example.com',
        likes: 5,
        __v: 0,
      },
    ]
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { title: 'Blog 1', author: 'A', url: '#', likes: 3 },
      { title: 'Blog 2', author: 'B', url: '#', likes: 2 },
      { title: 'Blog 3', author: 'A', url: '#', likes: 5 },
    ]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(10)
  })
})

// Aynı şekilde diğer testlerde de `expect` kullan

describe('favorite blog', () => {
  test('returns null for empty list', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('returns the only blog for a single-element list', () => {
    const single = [
      {
        title: 'Only Blog',
        author: 'Single Author',
        url: '#',
        likes: 7,
      },
    ]
    const result = listHelper.favoriteBlog(single)
    expect(result).toEqual(single[0])
  })

  test('returns blog with most likes', () => {
    const blogs = [
      { title: 'Blog 1', author: 'A', url: '#', likes: 3 },
      { title: 'Blog 2', author: 'B', url: '#', likes: 9 },
      { title: 'Blog 3', author: 'C', url: '#', likes: 5 },
    ]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[1])
  })
})

// Devamındaki diğer describe bloklarında da aynı şekilde `expect` kullan
