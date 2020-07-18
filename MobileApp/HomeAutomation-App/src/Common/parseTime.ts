export const parseTime = (time) => {
  const date = new Date(time);
  if (date.getTime() === 0) {
    return null;
  }
  let delta = Math.abs(date.getTime() - new Date().getTime()) / 1000;

  const days = Math.floor(delta / 86400);
  if (days > 0) {
    return date.toISOString().replace(/T/, " ").replace(/\..+/, "");
  }
  delta -= days * 86400;
  const hours = Math.floor(delta / 3600) % 24;
  if (hours > 0) {
    return `${hours} hour ago`;
  }
  delta -= hours * 3600;
  const minutes = Math.floor(delta / 60) % 60;
  if (minutes > 0) {
    return `${minutes} minute ago`;
  }
  delta -= minutes * 60;
  const seconds = Math.round(delta);
  if (seconds > 5) {
    return `${seconds} seconds ago`;
  }
  return "just now";
};
