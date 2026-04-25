import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const generateEnglish = async (topic, essayType = '') => {
  const response = await api.post('/api/english/', { topic, essay_type: essayType })
  return response.data
}

export const generateChinese = async (topic) => {
  const response = await api.post('/api/chinese/', { topic })
  return response.data
}

export const generateFlashcards = async (imageFile) => {
  const formData = new FormData()
  formData.append('image', imageFile)
  return api.post('/api/flashcards/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export default api
