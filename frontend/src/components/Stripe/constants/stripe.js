const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_k7nc1PLpsSVpAe8nXMJQYqJU'
  : 'pk_test_k7nc1PLpsSVpAe8nXMJQYqJU';

export default STRIPE_PUBLISHABLE;
