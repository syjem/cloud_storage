export type formSchema = {
  email: string;
  password: string;
};

export const formSubmit = async (formData: formSchema) => {
  const url = 'http://127.0.0.1:5000/api/sign_in';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
