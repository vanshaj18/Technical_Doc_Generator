const api = `${process.env.NEXT_PUBLIC_SERVER_API}`;
if (!api) {
  throw new Error('API endpoint is not defined. Please set NEXT_PUBLIC_SERVER_API in your environment variables.');
}

const handleSubmit = async (input: { type: "github" | "website"; url: string }) => {
  const { type, url } = input;

  try {
    const res = await fetch(`${api}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, url }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error:', res.status, errorText);
      return;
    }
    const data = await res.json();
    console.log('Response:', data);

  } catch (error) {
    console.error('Error generating documentation:', error);
  }
};


export {
  handleSubmit
};