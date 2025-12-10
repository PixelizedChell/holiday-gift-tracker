import { Card } from '@components/card';
import { ContextAlert } from '@components/context-alert';
import { Markdown } from 'components/markdown';
import { RandomQuote } from 'components/random-quote';
import { getNetlifyContext } from 'utils';

const contextExplainer = `
The card below is rendered on the server based on the value of \`process.env.CONTEXT\` 
([docs](https://docs.netlify.com/configure-builds/environment-variables/#build-metadata)):
`;

const preDynamicContentExplainer = `
The card content below is fetched by the client-side from \`/quotes/random\` (see file \`app/quotes/random/route.js\`) with a different quote shown on each page load:
`;

const ctx = getNetlifyContext();

export default function Page() {
    return (
        <div className="flex flex-col gap-12 sm:gap-16">
            <section>
                <ContextAlert className="mb-6" />
                <h1 className="mb-4">Gift Tracker</h1>
                <p className="mb-6 text-lg">
                    Track gifts to buy for friends, family, and more that you plan to buy, along with links and prices.
                </p>
            </section>
            {!!ctx && (
                <section className="flex flex-col gap-4">
                    <Markdown content={contextExplainer} className={undefined} />
                    <RuntimeContextCard />
                </section>
            )}
            <section className="flex flex-col gap-4">
                <Markdown content={preDynamicContentExplainer} className={undefined} />
                <RandomQuote />
            </section>
        </div>
    );
}

function RuntimeContextCard() {
    const title = `Netlify Context: running in ${ctx} mode.`;
    if (ctx === 'dev') {
        return (
            <Card title={title} className="">
                <p>Next.js will rebuild any page you navigate to, including static pages.</p>
            </Card>
        );
    } else {
        const now = new Date().toISOString();
        return (
            <Card title={title} className="">
                <p>This page was statically-generated at build time ({now}).</p>
            </Card>
        );
    }
}
