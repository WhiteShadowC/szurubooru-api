import SzurubooruApi from '../../szurubooru-api';

const api = new SzurubooruApi({ host: 'http://server:8080/' });

describe('tag category endpoints', () => {
  test('addTag', async () => {
    const tags = await api.getTagCategories({});
    console.log(tags);
    const shouldBe = {
      results: [
        {
          name: 'default',
          version: 1,
          color: 'default',
          usages: 0,
          default: true,
          order: 1,
        },
      ],
    };
    expect(tags).toEqual(shouldBe);
  });
});
