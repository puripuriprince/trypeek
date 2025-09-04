import { Navigation } from '@/components/Navigation';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for indie developers getting started',
      features: [
        '10 app lookups per month',
        'Basic revenue estimates',
        'Download metrics',
        'Community support',
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For growing studios and SaaS founders',
      features: [
        'Unlimited app lookups',
        'Advanced revenue analytics',
        'Growth trend analysis',
        'Competitive intelligence',
        'Export data (CSV/JSON)',
        'API access',
        'Priority support',
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For teams and large organizations',
      features: [
        'Everything in Pro',
        'Custom data integrations',
        'Dedicated account manager',
        'Advanced team features',
        'Custom reporting',
        'SLA guarantees',
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Simple, Transparent
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Pricing
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border-2 relative ${
                plan.popular 
                  ? 'border-blue-500 dark:border-blue-400' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 ml-2">
                    {plan.period}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-700 dark:text-slate-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 px-6 rounded-lg font-semibold transition-all ${
                plan.popular
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h3>
          
          <div className="max-w-2xl mx-auto space-y-6 text-left">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                How accurate are the revenue estimates?
              </h4>
              <p className="text-slate-600 dark:text-slate-300">
                Our estimates are based on industry-standard methodologies and typically achieve 80-95% accuracy, 
                depending on available data points and app characteristics.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                Do you offer refunds?
              </h4>
              <p className="text-slate-600 dark:text-slate-300">
                Yes! We offer a 14-day money-back guarantee for all paid plans. 
                No questions asked.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                Can I change plans anytime?
              </h4>
              <p className="text-slate-600 dark:text-slate-300">
                Absolutely! You can upgrade or downgrade your plan at any time. 
                Changes take effect immediately, and we&apos;ll prorate any differences.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}