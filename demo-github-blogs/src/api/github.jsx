import axios from "axios";

const baseURL =
  "https://api.github.com/repos/Ronixa584/Web-Development/contents/JS/Concepts";

export async function fetchBlogs() {
  try {
      const response = await axios.get(baseURL);
    //   console.log(response.data);
    return response.data; // Returns file metadata array
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function fetchBlogContent(blogPath) {
  try {
      const response = await axios.get(blogPath);
    //   console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error("Error fetching blog content:", error);
    return null;
  }
}
