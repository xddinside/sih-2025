# TODO

- [x] create landing page with mock dashboard
- [x] make the ui more responsive.
- [x] separate into smaller components + memoize
- [x] deploy on vercel
- [x] generate QRs to a link
- [x] setup clerk and convex.
- [x] connect clerk with convex
- [x] make the QR redirect on scan, to a unique session url with a token that'll run a convex mutation
- [x] fix the qr code generation
- [x] add ability of faculty to create lectures that get updated in the db
- [x] let faculty generate qr for each session
- [ ] handle students in db, generate attendance for the logged in student on scanning qr
- [ ] on starting a session, store in db the lecture's starting time with its name
- [ ] reload qr every 30 second with a new one, generating a new token that points to the same lecture
