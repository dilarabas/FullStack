import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm component', () => {
  test('form calls the event handler with correct details when a new blog is created', async () => {
    const createBlog = jest.fn() // Mock fonksiyon
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    // Input alanlarını ve butonu ID'leri ile seçelim
    const titleInput = screen.getByLabelText('title:') // veya screen.getByRole('textbox', { name: 'title:' });
    const authorInput = screen.getByLabelText('author:')
    const urlInput = screen.getByLabelText('url:')
    const createButton = screen.getByRole('button', { name: 'create' })

    // veya ID'ler ile:
    // const titleInput = screen.getByTestId('title-input')
    // const authorInput = screen.getByTestId('author-input')
    // const urlInput = screen.getByTestId('url-input')
    // const createButton = screen.getByTestId('create-button')


    await user.type(titleInput, 'Test Title for Blog')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'http://testurl.com')

    await user.click(createButton)

    // createBlog mock fonksiyonunun bir kez çağrıldığını kontrol edin
    expect(createBlog.mock.calls).toHaveLength(1)

    // createBlog mock fonksiyonuna doğru argümanların geçirilip geçirilmediğini kontrol edin
    expect(createBlog.mock.calls[0][0].title).toBe('Test Title for Blog')
    expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
    expect(createBlog.mock.calls[0][0].url).toBe('http://testurl.com')
  })
})