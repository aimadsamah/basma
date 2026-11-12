# بصمة — Basma Academy

    npm install && cp .env.example .env.local && npm run dev

## EmailJS setup
1. Create an Email Service and a Template at emailjs.com; put the three IDs in `.env.local`.
2. The EmailJS public key is designed to be public; restrict it by allowed domain in the EmailJS dashboard.
3. Template variables: `{{registration_type}}`, `{{program}}`, `{{full_name}}`, `{{phone}}`, `{{email}}`, `{{wilaya}}`, `{{details}}` (all other answers, one per line), `{{submitted_at}}`. Set "To email" to the academy's address and "Reply-To" to `{{email}}`.

## Configure
Edit `src/config/site.ts`: phone, email, address, wilaya, social links, `mapEmbedUrl` (Google Maps > Share > Embed a map > copy the src URL). Empty values display a placeholder.
