const listeners = new Set()
let users = []
let currentUser = null

const notify = () => {
  listeners.forEach((listener) => listener(currentUser))
}

export const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const getUser = () => currentUser

export const setUser = (user) => {
  currentUser = user
  notify()
}

export const clearUser = () => {
  currentUser = null
  notify()
}

export const signUp = async (payload) => {
  return new Promise((resolve, reject) => {
    const { password, confirmPassword, ...rest } = payload

    if (password !== confirmPassword) {
      reject(new Error("Passwords do not match"))
      return
    }

    const exists = users.find((u) => u.email === rest.email)
    if (exists) {
      reject(new Error("User already exists"))
      return
    }

    const newUser = {
      ...rest,
      password,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    resolve(newUser)
  })
}

export const signIn = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      reject(new Error("Invalid credentials"))
      return
    }

    currentUser = {
      ...user,
      lastLoginAt: new Date().toISOString(),
    }

    notify()
    resolve(currentUser)
  })
}
