export const uploadFile = async (file: File, password: string | null): Promise<Response> => {
    const formData = new FormData()
    formData.append("file", file)
    if (password) formData.append("password", password)
    const response = await fetch(`${import.meta.env.PUBLIC_SHAREIT_API_URL}/v1/files/upload`, {
      method: "POST",
      body: formData
    })
	return response
}