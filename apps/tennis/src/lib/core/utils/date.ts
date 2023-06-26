

export const formatDate = (date: string) => new Date(date).toLocaleString('en-us', {
  dateStyle: 'medium',
});
