type EnvVariables = {
  readonly ENV: 'production' | 'staging' | 'development' | 'test';
  readonly NODE_ENV: 'production' | 'development';
  readonly FRAMEWORK_PROVIDER: 'graphql' | 'rest';
  readonly NEXT_PUBLIC_REST_API_ENDPOINT: string;
  readonly NEXT_PUBLIC_GRAPHQL_API_ENDPOINT: string;
  readonly NEXT_PUBLIC_DEFAULT_LANGUAGE: string;
  readonly NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
  readonly NEXT_PUBLIC_RAZORPAY_PUBLISHABLE_KEY: string;
  readonly NEXT_PUBLIC_STRIPE_PAYMENT_ELEMENT_REDIRECT_URL: string;
  readonly NEXT_PUBLIC_SITE_URL: string;
  readonly NEXT_PUBLIC_ADMIN_URL: string;
  readonly NEXTAUTH_URL: string;
  readonly SECRET: string;
  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;
  readonly FACEBOOK_CLIENT_ID: string;
  readonly FACEBOOK_CLIENT_SECRET: string;
};
export function getEnv(name: string, fallback?: string): string | undefined {
  const val = process.env[name] || fallback;
  if (!val) {
    throw new Error(`Cannot find environmental variable: ${name}`);
  }
  return val;
}
