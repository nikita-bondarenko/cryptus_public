
const config = {
  schemaFile: 'https://cryptus-backend.partners-bot.ru//swagger/?format=openapi',
  apiFile: './src/redux/api/emptyApi.ts',
  apiImport: 'emptyApi',
  outputFile: './src/redux/api/cryptusApi.ts',
  exportName: 'cryptusApi',
  hooks: true,
}

export default config
