import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')

const loginUser = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/v1/authentication/token/', {
      username: username.value,
      password: password.value
    })
    if (response.status !== 200) {
      throw new Error('Login failed')
    }

    const token = response.data.access
    localStorage.setItem('token', response.data.access)
    router.push('/employee')          

  } catch (error) {
    alert('Erro no login: usuário ou senha inválidos')
    console.error(error)
  }
}