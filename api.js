import fetch from 'node-fetch'

export async function fetchUsers() {
  const { users } = await fetch('/api/v1/users').json()
  this.setState({ users })
}
