export const fetchUsersApi = async (page, pageSize, searchText) => {
    const url = new URL(
      "https://67bfced4b9d02a9f22474c36.mockapi.io/api/v1/users"
    );
    url.searchParams.append("page", page);
    url.searchParams.append("limit", pageSize);
    url.searchParams.append("search", searchText);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return [];
      }
    } catch (error) {
        return [];
    }
  };