const apiUrl = process.env.DEV_URL || "http://localhost:8080"
type Repo = {
  equipment: {
    name: string;
    category: string;
    description: string;
    quantity_available: string;
    condition: string;
    image_url: string;
    borrowing_id?: string;
    user_id?: string;
    equipment_id?: string;
    borrow_date?: string;
    return_date?: string;
    days_left?: string;
    status?: string;
  }
}[]

type FetchResult<T> = {
  equipment?: T,
  error?: string
}

export default async function getEquipmentBySearch(queryString: string | string[] | undefined): Promise<FetchResult<Repo>> {
  try {
    const resp = await fetch(`${apiUrl}/equipment/search?query=${queryString}`, {
      method: 'GET',
      next: { revalidate: 3 }
    });

    if (!resp.ok) {
      let errorData: FetchResult<Repo> = {};

      if (resp.status === 500) {
        const serverError = await resp.json();
        errorData = { error: `${serverError.error}` };
      } else {
        errorData = { error: `${resp.status}` };
      }

      return errorData;
    }

    const equipment: Repo = await resp.json();
    return { equipment };
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
    return { error: 'Unexpected error occurred' };
  }
}
