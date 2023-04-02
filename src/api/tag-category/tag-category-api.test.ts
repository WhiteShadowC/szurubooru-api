import SzurubooruApi from '../../szurubooru-api';

const api = new SzurubooruApi({ host: 'http://server:8080/' });

describe('tag category endpoints', () => {
  test('addTag', async () => {
    const tags = await api.getTagCategories();
    const shouldBe = {
      results: [
        {
          name: 'default',
          version: 2,
          color: 'default',
          usages: 2,
          default: true,
          order: 1,
        },
        {
          name: 'test1',
          version: 2,
          color: '#ffffff',
          usages: 2,
          default: false,
          order: 1,
        },
      ],
    };
    expect(tags).toEqual(shouldBe);
  });
});
