import netlifyFunction from '../../netlify/functions/github-portfolio';

const { handler } = netlifyFunction;

export default async function githubPortfolioApi(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'Only GET requests are supported.',
      },
    });
  }

  const result = await handler();

  Object.entries(result.headers || {}).forEach(([name, value]) => {
    response.setHeader(name, value);
  });

  return response.status(result.statusCode).send(result.body);
}
