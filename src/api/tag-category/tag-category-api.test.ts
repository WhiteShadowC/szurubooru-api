import SzurubooruApi from '../../szurubooru-api';

let api: SzurubooruApi;
beforeAll(async () => {
  const temp = new SzurubooruApi({ host: process.env.HOST });
  try {
    await temp.createUser({
      payload: {
        name: 'test',
        password: '12345678',
      },
    });
  } catch (e) {}

  api = new SzurubooruApi({ host: process.env.HOST, username: 'test', password: '12345678' });
});

describe('tag category endpoints', () => {
  test('getTagCategories', async () => {
    const tags = await api.getTagCategories();
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
