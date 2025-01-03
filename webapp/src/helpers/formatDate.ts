const dateFormat = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export const formatDate = (date: Date) => dateFormat.format(date);
