export function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return ""; // Invalid date format
    }
  
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
  
    // Convert hours to 12-hour format
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12; // Midnight
    }
  
    const formattedTime =
      hours !== 0 || minutes !== 0
        ? `${hours}:${minutes.toString().padStart(2, "0")}${ampm}`
        : "11:59pm";
  
    return `${formattedDate} [${formattedTime}]`;
  }