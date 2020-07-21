const MOVIE = {
  input: [
    { label: 'Tên', type: 'text', name: 'title', required: true },
    { label: 'Tên tiếng anh', type: 'text', name: 'title_en' },
    { label: 'Mô tả', type: 'text', name: 'description', required: true },
    { label: 'Thời lượng', type: 'number', name: 'duration' },
    { label: 'Đạo diễn', type: 'text', name: 'director' },
    { label: 'Quốc gia', type: 'text', name: 'nation' },
    { label: 'Đánh giá', type: 'number', name: 'evaluate', required: true },
    { label: 'Ngày ra mắt', type: 'text', name: 'release_date' },
    { label: 'Link', type: 'text', name: 'url', required: true },
  ],

  tags: [
    { name: 'Viễn tưởng', value: 'sci-fi' },
    { name: 'Phiêu lưu', value: 'adventure' },
    { name: 'Hành động', value: 'action' },
    { name: 'Thể thao', value: 'sport' },
    { name: 'Hài', value: 'comedy' },
    { name: 'Kinh dị', value: 'horror' },
    { name: 'Chiến tranh', value: 'war' },
    { name: 'Hoạt hình', value: 'anime' },
  ],

  type: [
    { name: 'Trends Now', value: 'trends' },
    { name: 'Phổ biến', value: 'popular' },
    { name: 'Trả phí', value: 'premium' },
  ],
  tabHeader: [
    {
      name: 'Trends Now',
      value: 'trends',
      icon: '<i class="fas fa-chart-line"></i>',
    },
    {
      name: 'Phổ biến',
      value: 'popular',
      icon: '<i class="fas fa-fire"></i>',
    },
    {
      name: 'Trả phí',
      value: 'premium',
      icon: '<i class="fas fa-star"></i>',
    },
    {
      name: 'My list',
      value: 'mylist',
      icon: '<i class="fas fa-plus"></i>',
    },
  ],
};

export default MOVIE;
