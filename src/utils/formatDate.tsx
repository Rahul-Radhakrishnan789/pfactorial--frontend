 export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  export const isFutureDate = (dateString?: string): boolean => {
  if (!dateString) return false;
  return new Date(dateString) > new Date();
};