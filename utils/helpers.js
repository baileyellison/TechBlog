module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    format_plural: (word, amount) => {
      // Pluralize words
      if (amount !== 1) {
        return `${word}s`;
      }
      return word;
    },
    format_url: (url) => {
      // Format URL to remove protocol and get just the domain
      return url
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .split('/')[0];
    },
  };