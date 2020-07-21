export const changeVN = (data) => {
  const newData = data.map((map) => {
    switch (map) {
      case 'sci-fi':
        return 'Viễn tưởng';
      case 'adventure':
        return 'Phiêu lưu';
      case 'action':
        return 'Hành động';
      case 'sport':
        return 'Thể thao';
      case 'comedy':
        return 'Hài';
      case 'horror':
        return 'Kinh dị';
      case 'war':
        return 'Chiến tranh';
      case 'anime':
        return 'Hoạt hình';
      default:
        return map;
    }
  });
  return newData;
};
