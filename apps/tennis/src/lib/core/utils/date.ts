

export const formatDate = (date: string) => new Date(`${date}T00:00:00`).toLocaleString('en-us', {
  dateStyle: 'medium',
});
