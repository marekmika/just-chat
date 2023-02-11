import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	// TODO: Solve the env
	schema: 'http://localhost:4000/graphql',
	generates: {
		'src/queries/generated/graphql.ts': {
			plugins: ['typescript'],
		},
	},
};

export default config;
