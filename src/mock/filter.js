/**
 * Generate mock data for app filter.
 *
 * @return {Array}
 */
export const getFilter = () => {
  return [
    {
      title: `Everything`,
      isChecked: true,
    },
    {
      title: `Future`,
      isChecked: false,
    },
    {
      title: `Past`,
      isChecked: false,
    },
  ];
};
