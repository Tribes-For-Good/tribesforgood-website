import axios from "axios";

// Function to fetch tags by IDs
export const getTags = async (tags) => {
  try {
    if (!tags || tags.length === 0) return []; // Handle empty input
    const response = await axios.get(
      `https://wp.tribesforgood.com/wp-json/wp/v2/tags`,
      {
        params: {
          include: tags.join(","), // Pass the tag IDs as a comma-separated string
        },
      }
    );
    return response.data; // Returns an array of tag objects
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};

// Function to fetch categories by IDs
export const getCategories = async (cats) => {
  try {
    if (!cats || cats.length === 0) return []; // Handle empty input
    const response = await axios.get(
      `https://wp.tribesforgood.com/wp-json/wp/v2/categories`,
      {
        params: {
          include: cats.join(","), // Pass the category IDs as a comma-separated string
        },
      }
    );
    return response.data; // Returns an array of category objects
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const toTitleCase = (text) => {
  if (!text) return ""; // Handle empty or undefined input
  return text
    .toLowerCase() // Convert the entire string to lowercase
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string
};
