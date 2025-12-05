'use strict';
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9453],
  {
    14763: (e, t, r) => {
      r.d(t, {
        Go: () => o,
        Qc: () => u,
        cM: () => f,
        sb: () => c,
        wN: () => d,
      });
      var n = r(53455),
        i = r(99776),
        a = r(80549),
        s = r(28153);
      let l = { staleTime: 6e4, retry: 1 },
        o = (e) =>
          (0, n.I)({
            queryKey: ['userProfile', e],
            queryFn: () => s.Ay.getUserProfileByWallet(e),
            enabled: !!e,
            ...l,
          }),
        d = (e) =>
          (0, n.I)({
            queryKey: ['userProfile', e],
            queryFn: async () => {
              let t = await s.Ay.getUserProfileByWallet(e);
              return null == t ? void 0 : t.userName;
            },
            enabled: !!e,
            ...l,
          }),
        c = () =>
          (0, n.I)({
            queryKey: ['myProfile'],
            queryFn: () => s.Ay.getUserProfile(),
            ...l,
          }),
        u = () => {
          let e = (0, i.jE)();
          return (0, a.n)({
            mutationFn: (e) => s.Ay.updateUser(e),
            onSuccess: (t) => {
              e.setQueryData(['myProfile'], t);
            },
          });
        },
        f = () => {
          let e = (0, i.jE)();
          return (0, a.n)({
            mutationFn: (e) => s.Ay.updateUserBackground(e),
            onSuccess: (t) => {
              e.setQueryData(['myProfile'], t);
            },
          });
        };
    },
    28153: (e, t, r) => {
      r.d(t, { Ay: () => l });
      var n = r(95125),
        i = r(72378);
      let a = 'https://d5ffe0dc8ad8.ngrok-free.app/api',
        s = () => {
          let e = i.A.get('accessToken');
          return e ? { Authorization: 'Bearer '.concat(e) } : {};
        },
        l = {
          getUserProfile: async () =>
            (
              await n.A.get(''.concat(a, '/user'), {
                headers: { ...s(), 'ngrok-skip-browser-warning': 'true' },
              })
            ).data.data,
          getUserProfileByWallet: async (e) => {
            let t = i.A.get('account') || '';
            return (
              await n.A.get(''.concat(a, '/user/get-profile'), {
                params: { addressWallet: e, myAddressWallet: t || void 0 },
                headers: { ...s(), 'ngrok-skip-browser-warning': 'true' },
              })
            ).data.data;
          },
          updateUser: async (e) => {
            let t = new FormData();
            return (
              t.append('userName', e.userName),
              t.append('fullName', e.fullName),
              t.append('bio', e.bio),
              e.avatar && t.append('avatar', e.avatar),
              (
                await n.A.put(''.concat(a, '/user'), t, {
                  headers: {
                    ...s(),
                    'ngrok-skip-browser-warning': 'true',
                    'Content-Type': 'multipart/form-data',
                  },
                })
              ).data.data
            );
          },
          updateUserBackground: async (e) => {
            let t = new FormData();
            return (
              t.append('image', e.image),
              (
                await n.A.put(''.concat(a, '/user/update-background'), t, {
                  headers: {
                    ...s(),
                    'ngrok-skip-browser-warning': 'true',
                    'Content-Type': 'multipart/form-data',
                  },
                })
              ).data.data
            );
          },
          getUserAvatar: (e) =>
            'https://res.cloudinary.com/dr6cnnvma/image/upload/v1763370298/'.concat(
              e,
              '.png',
            ),
        };
    },
    29453: (e, t, r) => {
      (r.r(t), r.d(t, { default: () => W }));
      var n = r(95155),
        i = r(20063),
        a = r(41574),
        s = r(98638),
        l = r(80317),
        o = r(27855),
        d = r(41942),
        c = r(70539),
        u = r(35346),
        f = r(84389),
        p = r(15239),
        x = r(76541),
        m = r(96021),
        h = r(9115),
        g = r(85852),
        A = r(39620),
        b = r(12115),
        y = r(22591),
        w = r(93531),
        j = r(14763),
        v = r(93475),
        I = r(51012),
        k = r(99794),
        F = r(51289);
      function C(e) {
        let { auctionId: t, minBidEth: r, disabled: i } = e,
          [a, s] = (0, b.useState)(!1),
          l = async () => {
            if (!window.ethereum) return alert('Connect wallet');
            let e = prompt('Enter your bid in ETH (min '.concat(r, ')'));
            if (!e) return;
            let n = Number(e);
            if (isNaN(n) || n <= 0) return alert('Invalid amount');
            if (n < r) return alert('Bid too low');
            try {
              s(!0);
              let e = new I.k(window.ethereum),
                r = await e.getSigner(),
                i = k.g5(n.toString());
              (await v.v_.placeBid(r, t, i),
                await F.N.from('auction_bids').insert([
                  {
                    auction_id: t,
                    bidder: await r.getAddress(),
                    bid_amount: i.toString(),
                  },
                ]),
                alert('Bid placed'));
            } catch (e) {
              (console.error(e), alert('Failed to place bid'));
            } finally {
              s(!1);
            }
          };
        return (0, n.jsx)(o.A, {
          variant: 'contained',
          sx: { bgcolor: '#9333ea', mb: 2 },
          onClick: l,
          disabled: a || i,
          children: a ? 'Placing...' : 'Place Bid',
        });
      }
      function N(e) {
        let { auctionId: t, sellerAddress: r, onFinalize: i } = e,
          [a, s] = (0, b.useState)(!1),
          [l, d] = (0, b.useState)(!1);
        (0, b.useEffect)(() => {
          (async () => {
            if (window.ethereum && r)
              try {
                let e = new I.k(window.ethereum),
                  t = await e.getSigner(),
                  n = await t.getAddress();
                d(n.toLowerCase() === r.toLowerCase());
              } catch (e) {
                d(!1);
              }
          })();
        }, [r]);
        let c = async () => {
          if (!window.ethereum) return alert('Connect wallet');
          if (!t || !r) return alert('Invalid auction data');
          try {
            s(!0);
            let e = new I.k(window.ethereum),
              r = await e.getSigner();
            (await v.v_.finalizeAuction(r, t),
              await F.N.from('auctions')
                .update({ status: 'ended' })
                .eq('auction_id', t),
              alert('Auction finalized'),
              i && i());
          } catch (e) {
            (console.error(e), alert('Finalize failed'));
          } finally {
            s(!1);
          }
        };
        return t && r && l
          ? (0, n.jsx)(o.A, {
              variant: 'contained',
              sx: { bgcolor: '#e11d48', mb: 2 },
              onClick: c,
              disabled: a,
              children: a ? 'Finalizing...' : 'Finalize Auction',
            })
          : null;
      }
      var S = r(3648),
        B = r(10225),
        T = r(71838);
      let D = (e) => {
          let { value: t, duration: r = 0.4 } = e,
            i = (0, b.useRef)(null),
            [a, s] = (0, b.useState)(t);
          return (
            (0, b.useEffect)(() => {
              if (!i.current) return;
              let e = -(40 * t);
              ((0, T.i)(-(40 * a), e, {
                duration: r,
                ease: [0.4, 0, 0.2, 1],
                onUpdate: (e) => {
                  i.current &&
                    (i.current.style.transform = 'translateY('.concat(
                      e,
                      'px)',
                    ));
                },
              }),
                s(t));
            }, [t, r, a]),
            (0, n.jsx)('div', {
              style: {
                overflow: 'hidden',
                height: 40,
                width: 28,
                perspective: 400,
              },
              children: (0, n.jsx)('div', {
                ref: i,
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  transformStyle: 'preserve-3d',
                },
                children: [...Array(10)].map((e, t) =>
                  (0, n.jsx)(
                    'div',
                    {
                      style: {
                        height: 40,
                        width: 28,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 700,
                        fontSize: 28,
                        color: '#ff33cc',
                        backfaceVisibility: 'hidden',
                      },
                      children: t,
                    },
                    t,
                  ),
                ),
              }),
            })
          );
        },
        E = (e) => {
          let { number: t, duration: r = 0.4, padLength: i = 2 } = e,
            s = t.toString().padStart(i, '0').split('').map(Number);
          return (0, n.jsx)(a.default, {
            sx: { display: 'flex', gap: 2 },
            children: s.map((e, t) =>
              (0, n.jsx)(D, { value: e, duration: r }, t),
            ),
          });
        };
      function L() {
        let e = (0, S._)([
          '\n  0% { text-shadow: 0 0 5px #ff33cc, 0 0 10px #ff33cc; }\n  50% { text-shadow: 0 0 20px #ff33cc, 0 0 40px #ff33cc; }\n  100% { text-shadow: 0 0 5px #ff33cc, 0 0 10px #ff33cc; }\n',
        ]);
        return (
          (L = function () {
            return e;
          }),
          e
        );
      }
      let P = (0, B.i7)(L());
      function _(e) {
        let { endTime: t } = e,
          [r, i] = (0, b.useState)(0);
        if (
          ((0, b.useEffect)(() => {
            let e = () => {
              if (!t) return i(0);
              i(
                Math.max(
                  0,
                  Math.floor(
                    ((Number(t) > 1e10 ? Number(t) : 1e3 * Number(t)) -
                      Date.now()) /
                      1e3,
                  ),
                ),
              );
            };
            e();
            let r = setInterval(e, 1e3);
            return () => clearInterval(r);
          }, [t]),
          r <= 0)
        )
          return (0, n.jsx)(l.A, {
            sx: { color: '#ff33cc', fontWeight: 700 },
            children: 'Ended',
          });
        let s = Math.floor(r / 86400),
          o = Math.floor((r % 86400) / 3600),
          d = Math.floor((r % 3600) / 60),
          c = r <= 60 ? { animation: ''.concat(P, ' 1s infinite') } : {};
        return (0, n.jsx)(a.default, {
          sx: {
            display: 'flex',
            gap: 3,
            alignItems: 'center',
            bgcolor: 'rgba(10,10,30,0.6)',
            padding: 2,
            borderRadius: 3,
            border: '2px solid #9d00ff',
            boxShadow: '0 0 20px #9d00ff, 0 0 40px #ff00ff',
          },
          children: [
            { num: s, label: 'days' },
            { num: o, label: 'hrs' },
            { num: d, label: 'min' },
            { num: r % 60, label: 'sec' },
          ].map((e, t) => {
            let { num: r, label: i } = e;
            return (0, n.jsxs)(
              a.default,
              {
                sx: {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                },
                children: [
                  (0, n.jsx)(a.default, {
                    sx: c,
                    children: (0, n.jsx)(E, { number: r }),
                  }),
                  (0, n.jsx)(l.A, {
                    sx: { fontSize: 12, color: '#ff99ff' },
                    children: i,
                  }),
                ],
              },
              t,
            );
          }),
        });
      }
      function z(e) {
        let { nft: t } = e,
          [r, i] = (0, b.useState)(0),
          [s, o] = (0, b.useState)([]),
          [d, c] = (0, b.useState)(null),
          [u, f] = (0, b.useState)(!1);
        ((0, b.useEffect)(() => {
          (async () => {
            try {
              if (window.ethereum) {
                let e = new I.k(window.ethereum),
                  t = await e.getSigner(),
                  r = await t.getAddress();
                c(r.toLowerCase());
              }
            } catch (e) {
              c(null);
            }
          })();
        }, []),
          (0, b.useEffect)(() => {
            if (!(null == t ? void 0 : t.endTime)) return i(0);
            let e =
                Number(t.endTime) > 1e10
                  ? Number(t.endTime)
                  : 1e3 * Number(t.endTime),
              r = () => i(Math.max(e - Date.now(), 0));
            r();
            let n = setInterval(r, 1e3);
            return () => clearInterval(n);
          }, [null == t ? void 0 : t.endTime]));
        let p = r <= 0;
        (0, b.useEffect)(() => {
          if (!(null == t ? void 0 : t.auctionId)) return;
          let e = !1;
          (async () => {
            let { data: r } = await F.N.from('auction_bids')
              .select('*')
              .eq('auction_id', t.auctionId)
              .order('created_at', { ascending: !1 })
              .limit(10);
            !e &&
              r &&
              o(
                r.map((e) => ({
                  address: e.bidder,
                  amount: Number(e.bid_amount) / 1e18,
                })),
              );
          })();
          let r = F.N.channel('auction_'.concat(t.auctionId))
            .on(
              'postgres_changes',
              {
                event: 'INSERT',
                schema: 'public',
                table: 'auction_bids',
                filter: 'auction_id=eq.'.concat(t.auctionId),
              },
              (e) => {
                let t = e.new,
                  r = Number(t.bid_amount) / 1e18;
                o((e) => [{ address: t.bidder, amount: r }, ...e].slice(0, 10));
              },
            )
            .subscribe();
          return () => {
            ((e = !0), F.N.removeChannel(r));
          };
        }, [null == t ? void 0 : t.auctionId]);
        let x = (0, b.useMemo)(() => {
            var e;
            return Number(null != (e = t.price) ? e : '0');
          }, [t.price]),
          m = Array.isArray(t.seller) ? t.seller : t.seller ? [t.seller] : [],
          h = d && m.length > 0 && d === m[0].addressWallet.toLowerCase();
        return (0, n.jsxs)(a.default, {
          sx: {
            bgcolor: 'rgba(17,24,39,0.5)',
            p: 3,
            borderRadius: 3,
            mt: 3,
            border: '1px solid #2D155A',
          },
          children: [
            (0, n.jsx)(l.A, { variant: 'h6', children: 'Auction' }),
            (0, n.jsxs)(a.default, {
              mt: 2,
              children: [
                (0, n.jsx)(l.A, {
                  sx: { mb: 1, opacity: 0.7 },
                  children: 'Time Left',
                }),
                p ? null : (0, n.jsx)(_, { endTime: t.endTime }),
                (0, n.jsxs)(l.A, {
                  sx: { mt: 2, mb: 1 },
                  children: ['Min Bid: ', x, ' ETH'],
                }),
                p
                  ? u
                    ? (0, n.jsx)(l.A, {
                        sx: { color: '#10B981', fontWeight: 600 },
                        children: '✅ Auction finalized',
                      })
                    : h && null != t.auctionId
                      ? (0, n.jsx)(N, {
                          auctionId: t.auctionId,
                          sellerAddress: m[0].addressWallet,
                          onFinalize: () => f(!0),
                        })
                      : (0, n.jsx)(l.A, {
                          sx: { color: '#9CA3AF' },
                          children:
                            'Auction closed. Waiting for seller to finalize.',
                        })
                  : h || null == t.auctionId
                    ? h && null != t.auctionId
                      ? (0, n.jsx)(l.A, {
                          sx: { color: '#6B7280', fontWeight: 500 },
                          children: 'Bạn l\xe0 seller',
                        })
                      : null
                    : (0, n.jsx)(C, { auctionId: t.auctionId, minBidEth: x }),
                (0, n.jsx)(l.A, {
                  sx: { mb: 1, opacity: 0.6, mt: 2 },
                  children: 'Top Bids',
                }),
                s.length > 0
                  ? s.map((e, t) =>
                      (0, n.jsxs)(
                        a.default,
                        {
                          display: 'flex',
                          justifyContent: 'space-between',
                          p: 1,
                          bgcolor: 'rgba(31,41,55,0.5)',
                          borderRadius: 1,
                          mb: 1,
                          children: [
                            (0, n.jsxs)(l.A, {
                              children: [t + 1, '. ', e.address],
                            }),
                            (0, n.jsxs)(l.A, { children: [e.amount, ' ETH'] }),
                          ],
                        },
                        t,
                      ),
                    )
                  : (0, n.jsx)(l.A, { children: 'No bids yet.' }),
              ],
            }),
          ],
        });
      }
      function W() {
        var e;
        let { id: t } = (0, i.useParams)(),
          r = (0, i.useRouter)(),
          v = Number(t),
          [, I] = (0, b.useState)(!1),
          { data: k, isLoading: F, isError: C } = (0, y.lk)(v),
          { data: N = [] } = (0, y.U0)(v),
          { mutate: S, isPending: B } = (0, w.L)(),
          [T, D] = (0, b.useState)({
            properties: !1,
            activity: !1,
            details: !1,
            description: !1,
            auction: !1,
          }),
          E = (e) => D((t) => ({ ...t, [e]: !t[e] })),
          L = Array.isArray(N) ? N : [],
          P = L.filter((e) => 'Sale' === e.evenType && !!e.toAddress).sort(
            (e, t) =>
              new Date(t.createdAt).getTime() - new Date(e.createdAt).getTime(),
          )[0],
          { data: _ } = (0, j.wN)((null == P ? void 0 : P.toAddress) || ''),
          W = Array.isArray(null == k ? void 0 : k.creator)
            ? k.creator
            : (null == k ? void 0 : k.creator)
              ? [k.creator]
              : [],
          U = Array.isArray(null == k ? void 0 : k.seller)
            ? k.seller
            : (null == k ? void 0 : k.seller)
              ? [k.seller]
              : [],
          R = (null == k ? void 0 : k.price) ? Number(k.price) : 0,
          M = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(2e3 * R),
          [q, J] = (0, b.useState)([]),
          [Q, K] = (0, b.useState)(0);
        return ((0, b.useEffect)(() => {
          if (
            !(null == k ? void 0 : k.auctionId) ||
            !(null == k ? void 0 : k.endTime)
          )
            return;
          let e = new Date(k.endTime).getTime(),
            t = () => K(Math.max(e - Date.now(), 0));
          t();
          let r = setInterval(t, 1e3);
          return () => clearInterval(r);
        }, [null == k ? void 0 : k.auctionId, null == k ? void 0 : k.endTime]),
        (0, b.useEffect)(() => {
          (null == k ? void 0 : k.auctionId) &&
            J(
              L.filter((e) => 'Bid' === e.evenType)
                .sort((e, t) => Number(t.price) - Number(e.price))
                .slice(0, 5)
                .map((e) => ({
                  address: e.fromAddress,
                  amount: Number(e.price),
                })),
            );
        }, [L, null == k ? void 0 : k.auctionId]),
        F)
          ? (0, n.jsx)(a.default, {
              sx: { textAlign: 'center', color: '#fff', py: 10 },
              children: (0, n.jsx)(s.A, { color: 'secondary' }),
            })
          : C || !k
            ? (0, n.jsxs)(a.default, {
                sx: { textAlign: 'center', color: '#fff', py: 10 },
                children: [
                  (0, n.jsx)(l.A, { children: 'NFT not found' }),
                  (0, n.jsx)(o.A, {
                    onClick: () => r.push('/marketplace'),
                    children: 'Back',
                  }),
                ],
              })
            : (0, n.jsxs)(a.default, {
                sx: {
                  color: 'white',
                  px: { xs: 2, sm: 4, md: 6 },
                  py: { xs: 6, sm: 3, md: 10 },
                  maxWidth: 1400,
                  mx: 'auto',
                  fontFamily: '"Orbitron", sans-serif',
                },
                children: [
                  (0, n.jsxs)(l.A, {
                    onClick: () => r.push('/marketplace'),
                    sx: {
                      color: '#B983FF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.8,
                      mb: 4,
                      cursor: 'pointer',
                      fontSize: 14,
                      '&:hover': { color: '#E0AFFF' },
                    },
                    children: [
                      (0, n.jsx)(x.A, { sx: { fontSize: 20 } }),
                      ' Cyber Punks Collection',
                    ],
                  }),
                  (0, n.jsxs)(d.A, {
                    direction: { xs: 'column', sm: 'column', md: 'row' },
                    spacing: { xs: 3, sm: 4, md: 8 },
                    alignItems: {
                      xs: 'center',
                      sm: 'center',
                      md: 'flex-start',
                    },
                    children: [
                      (0, n.jsxs)(a.default, {
                        sx: {
                          flex: { xs: 'unset', sm: 1, md: 1 },
                          width: { xs: '100%', sm: '90%', md: '50%' },
                        },
                        children: [
                          (0, n.jsxs)(c.A, {
                            sx: {
                              borderRadius: 3,
                              overflow: 'hidden',
                              position: 'relative',
                              border: '2px solid #2A145A',
                              bgcolor: 'rgba(17,24,39,0.5)',
                            },
                            children: [
                              (0, n.jsx)(p.default, {
                                src: 'https://gateway.pinata.cloud/ipfs/'.concat(
                                  k.image,
                                ),
                                alt: k.name,
                                width: 800,
                                height: 800,
                                style: {
                                  width: '100%',
                                  height: 'auto',
                                  borderRadius: '25px',
                                  objectFit: 'cover',
                                },
                                placeholder: 'blur',
                                blurDataURL: '/placeholder.jpg',
                                priority: !0,
                              }),
                              (0, n.jsx)(a.default, {
                                sx: {
                                  position: 'absolute',
                                  top: { xs: 10, sm: 15, md: 20 },
                                  right: { xs: 10, sm: 15, md: 20 },
                                  cursor: B ? 'not-allowed' : 'pointer',
                                  bgcolor: k.isLike
                                    ? '#fff'
                                    : 'rgba(31,41,55,0.6)',
                                  p: { xs: 0.8, sm: 1, md: 1.2 },
                                  borderRadius: '50%',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    bgcolor: k.isLike
                                      ? '#fff'
                                      : 'rgba(255,76,253,0.8)',
                                    transform: B ? 'none' : 'scale(1.05)',
                                  },
                                },
                                onClick: () => {
                                  B || S({ targetId: v, targetType: 'nft' });
                                },
                                children: k.isLike
                                  ? (0, n.jsx)(m.A, {
                                      sx: {
                                        fontSize: { xs: 20, sm: 23, md: 25 },
                                        color: '#FF4CFD',
                                      },
                                    })
                                  : (0, n.jsx)(h.A, {
                                      sx: {
                                        fontSize: { xs: 20, sm: 23, md: 25 },
                                        color: '#fff',
                                      },
                                    }),
                              }),
                            ],
                          }),
                          (null == (e = k.properties) ? void 0 : e.length) >
                            0 &&
                            (0, n.jsxs)(a.default, {
                              mt: 4,
                              sx: {
                                bgcolor: 'rgba(17,24,39,0.5)',
                                p: { xs: 2, sm: 2.5, md: 3 },
                                borderRadius: 3,
                                border: '1px solid #2D155A',
                              },
                              children: [
                                (0, n.jsxs)(a.default, {
                                  sx: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                  },
                                  onClick: () => E('properties'),
                                  children: [
                                    (0, n.jsx)(l.A, {
                                      variant: 'h6',
                                      children: 'Properties',
                                    }),
                                    T.properties
                                      ? (0, n.jsx)(g.A, {
                                          sx: { color: '#B983FF' },
                                        })
                                      : (0, n.jsx)(A.A, {
                                          sx: { color: '#B983FF' },
                                        }),
                                  ],
                                }),
                                (0, n.jsx)(u.A, {
                                  in: T.properties,
                                  children: (0, n.jsx)(d.A, {
                                    mt: 2,
                                    gap: 1,
                                    children: k.properties.map((e, t) =>
                                      (0, n.jsxs)(
                                        a.default,
                                        {
                                          sx: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            bgcolor: 'rgba(31,41,55,0.5)',
                                            p: 2,
                                            borderRadius: 2,
                                            border: '1.2px solid #2A2A4A',
                                          },
                                          children: [
                                            (0, n.jsx)(l.A, {
                                              variant: 'caption',
                                              sx: { color: '#fff5' },
                                              children: e.type,
                                            }),
                                            (0, n.jsx)(l.A, {
                                              children: e.name,
                                            }),
                                          ],
                                        },
                                        t,
                                      ),
                                    ),
                                  }),
                                }),
                              ],
                            }),
                        ],
                      }),
                      (0, n.jsxs)(a.default, {
                        sx: {
                          flex: { xs: 'unset', sm: 1, md: 1 },
                          width: { xs: '100%', sm: '90%', md: '50%' },
                          mt: { xs: 3, sm: 3, md: 0 },
                        },
                        children: [
                          (0, n.jsx)(l.A, {
                            fontWeight: 600,
                            sx: {
                              fontSize: {
                                xs: '1.5rem',
                                sm: '2rem',
                                md: '2.5rem',
                              },
                            },
                            children: k.name,
                          }),
                          (0, n.jsxs)(a.default, {
                            mt: 1,
                            fontSize: { xs: 12, sm: 14, md: 14 },
                            children: [
                              W.length > 0 &&
                                (0, n.jsxs)(l.A, {
                                  sx: { color: '#9CA3AF' },
                                  children: [
                                    'Created by:',
                                    ' ',
                                    (0, n.jsxs)('strong', {
                                      style: {
                                        cursor: 'pointer',
                                        color: '#B983FF',
                                      },
                                      onClick: () =>
                                        r.push(
                                          '/profile/'.concat(
                                            W[0].addressWallet,
                                          ),
                                        ),
                                      children: ['@', W[0].userName],
                                    }),
                                  ],
                                }),
                              U.length > 0
                                ? (0, n.jsxs)(l.A, {
                                    sx: { color: '#9CA3AF' },
                                    children: [
                                      'Owned by:',
                                      ' ',
                                      (0, n.jsxs)('strong', {
                                        style: {
                                          cursor: 'pointer',
                                          color: '#B983FF',
                                        },
                                        onClick: () =>
                                          r.push(
                                            '/profile/'.concat(
                                              U[0].addressWallet,
                                            ),
                                          ),
                                        children: ['@', U[0].userName],
                                      }),
                                    ],
                                  })
                                : (0, n.jsx)(n.Fragment, {
                                    children:
                                      !U.length &&
                                      P &&
                                      (0, n.jsxs)(a.default, {
                                        children: [
                                          (0, n.jsxs)(l.A, {
                                            sx: { color: '#9CA3AF' },
                                            children: [
                                              'Owned by:',
                                              ' ',
                                              (0, n.jsxs)('strong', {
                                                style: {
                                                  cursor: 'pointer',
                                                  color: '#B983FF',
                                                },
                                                onClick: () =>
                                                  r.push(
                                                    '/profile/'.concat(
                                                      P.toAddress,
                                                    ),
                                                  ),
                                                children: [
                                                  '@',
                                                  null != _ ? _ : 'Unknown',
                                                ],
                                              }),
                                            ],
                                          }),
                                          (0, n.jsx)(f.A, {
                                            sx: { bgcolor: '#2D155A', my: 1 },
                                          }),
                                        ],
                                      }),
                                  }),
                            ],
                          }),
                          k.auctionId
                            ? (0, n.jsx)(z, { nft: k })
                            : (0, n.jsxs)(a.default, {
                                sx: {
                                  bgcolor: 'rgba(17,24,39,0.5)',
                                  p: 3,
                                  borderRadius: 3,
                                  mt: 3,
                                  border: '1px solid #2D155A',
                                },
                                children: [
                                  (0, n.jsx)(l.A, {
                                    sx: {
                                      opacity: 0.6,
                                      mb: 1.5,
                                      color: '#E5E7EB',
                                    },
                                    children: 'Current Price',
                                  }),
                                  (0, n.jsxs)(l.A, {
                                    variant: 'h5',
                                    fontWeight: 600,
                                    children: [
                                      R,
                                      ' ETH',
                                      ' ',
                                      (0, n.jsxs)(l.A, {
                                        sx: {
                                          opacity: 0.6,
                                          ml: 1,
                                          display: 'inline',
                                          fontSize: 14,
                                        },
                                        children: ['(', M, ')'],
                                      }),
                                    ],
                                  }),
                                  (0, n.jsxs)(d.A, {
                                    direction: { xs: 'column', sm: 'row' },
                                    spacing: 2,
                                    mt: 2,
                                    children: [
                                      (0, n.jsx)(o.A, {
                                        variant: 'contained',
                                        sx: {
                                          bgcolor: '#9333ea',
                                          textTransform: 'none',
                                          fontWeight: 700,
                                          width: '100%',
                                        },
                                        children: 'Buy Now',
                                      }),
                                      (0, n.jsx)(o.A, {
                                        variant: 'outlined',
                                        sx: {
                                          borderColor: '#9333ea',
                                          color: '#9333ea',
                                          textTransform: 'none',
                                          fontWeight: 700,
                                          width: '100%',
                                        },
                                        children: 'Make Offer',
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                          (0, n.jsxs)(a.default, {
                            mt: 4,
                            sx: {
                              bgcolor: 'rgba(17,24,39,0.5)',
                              p: { xs: 2, sm: 2.5, md: 3 },
                              borderRadius: 3,
                              border: '1px solid #2D155A',
                            },
                            children: [
                              (0, n.jsxs)(a.default, {
                                sx: {
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  cursor: 'pointer',
                                },
                                onClick: () => E('description'),
                                children: [
                                  (0, n.jsx)(l.A, {
                                    variant: 'h6',
                                    color: '#FFF',
                                    sx: { fontWeight: 400 },
                                    children: 'Description',
                                  }),
                                  T.description
                                    ? (0, n.jsx)(g.A, { sx: { color: '#FFF' } })
                                    : (0, n.jsx)(A.A, {
                                        sx: { color: '#FFF' },
                                      }),
                                ],
                              }),
                              (0, n.jsx)(u.A, {
                                in: T.description,
                                children: (0, n.jsx)(l.A, {
                                  sx: {
                                    mt: 2,
                                    color: '#D1D5DB',
                                    fontWeight: 300,
                                  },
                                  children:
                                    k.description || 'No description provided.',
                                }),
                              }),
                            ],
                          }),
                          (0, n.jsxs)(a.default, {
                            mt: 4,
                            sx: {
                              bgcolor: 'rgba(17,24,39,0.5)',
                              p: 3,
                              borderRadius: 3,
                              border: '1px solid #2D155A',
                            },
                            children: [
                              (0, n.jsxs)(a.default, {
                                sx: {
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  cursor: 'pointer',
                                },
                                onClick: () => E('details'),
                                children: [
                                  (0, n.jsx)(l.A, {
                                    variant: 'h6',
                                    color: '#FFF',
                                    sx: { fontWeight: 400 },
                                    children: 'Details',
                                  }),
                                  T.details
                                    ? (0, n.jsx)(g.A, { sx: { color: '#FFF' } })
                                    : (0, n.jsx)(A.A, {
                                        sx: { color: '#FFF' },
                                      }),
                                ],
                              }),
                              (0, n.jsx)(u.A, {
                                in: T.details,
                                children: (0, n.jsxs)(d.A, {
                                  mt: 2,
                                  spacing: 1,
                                  children: [
                                    (0, n.jsxs)(l.A, {
                                      sx: { color: '#9CA3AF' },
                                      children: [
                                        'Contract Address:',
                                        ' ',
                                        (0, n.jsx)('strong', {
                                          style: { color: '#9333ea' },
                                          children: k.contractAddress,
                                        }),
                                      ],
                                    }),
                                    (0, n.jsxs)(l.A, {
                                      sx: { color: '#9CA3AF' },
                                      children: ['Token ID: ', k.tokenId],
                                    }),
                                    (0, n.jsxs)(l.A, {
                                      sx: { color: '#9CA3AF' },
                                      children: ['Blockchain: ', k.blockchain],
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                          (0, n.jsxs)(a.default, {
                            mt: 5,
                            sx: {
                              bgcolor: 'rgba(17,24,39,0.5)',
                              p: 3,
                              borderRadius: 3,
                              border: '1px solid #2D155A',
                            },
                            children: [
                              (0, n.jsxs)(a.default, {
                                sx: {
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  cursor: 'pointer',
                                },
                                onClick: () => E('activity'),
                                children: [
                                  (0, n.jsx)(l.A, {
                                    variant: 'h6',
                                    children: 'Activity',
                                  }),
                                  T.activity
                                    ? (0, n.jsx)(g.A, {
                                        sx: { color: '#B983FF' },
                                      })
                                    : (0, n.jsx)(A.A, {
                                        sx: { color: '#B983FF' },
                                      }),
                                ],
                              }),
                              (0, n.jsx)(u.A, {
                                in: T.activity,
                                children: (0, n.jsx)(d.A, {
                                  mt: 2,
                                  gap: 2,
                                  children:
                                    L.length > 0
                                      ? L.map((e) =>
                                          (0, n.jsxs)(
                                            a.default,
                                            {
                                              children: [
                                                (0, n.jsxs)(a.default, {
                                                  display: 'flex',
                                                  gap: 1,
                                                  flexWrap: 'wrap',
                                                  children: [
                                                    (0, n.jsx)(l.A, {
                                                      fontWeight: 700,
                                                      children: e.evenType,
                                                    }),
                                                    'Mint' !== e.evenType &&
                                                      (0, n.jsxs)(l.A, {
                                                        children: [
                                                          'Price: ',
                                                          e.price,
                                                        ],
                                                      }),
                                                    (0, n.jsxs)(l.A, {
                                                      children: [
                                                        'Qty: ',
                                                        e.quantity,
                                                      ],
                                                    }),
                                                    (0, n.jsxs)(l.A, {
                                                      children: [
                                                        'To: ',
                                                        e.toAddress,
                                                      ],
                                                    }),
                                                    (0, n.jsxs)(l.A, {
                                                      children: [
                                                        'Date: ',
                                                        new Date(
                                                          e.createdAt,
                                                        ).toLocaleString(),
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                                (0, n.jsx)(f.A, {
                                                  sx: {
                                                    bgcolor: '#2D155A',
                                                    my: 1,
                                                  },
                                                }),
                                              ],
                                            },
                                            e.id,
                                          ),
                                        )
                                      : (0, n.jsx)(l.A, {
                                          children: 'No activity yet.',
                                        }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              });
      }
    },
    51289: (e, t, r) => {
      r.d(t, { N: () => s });
      var n = r(85553);
      let i = 'https://bhhsxrupcbhbrqyqxcyd.supabase.co',
        a =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoaHN4cnVwY2JoYnJxeXF4Y3lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NDAzNjYsImV4cCI6MjA3ODMxNjM2Nn0._y2DYaQZzAKQTvXwLmooFrwJBKE4w1nsWfa3rpk95M8';
      if (!i || !a)
        throw Error(
          '❌ Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Netlify.',
        );
      let s = (0, n.UU)(i, a, { auth: { persistSession: !1 } });
    },
    84342: (e, t, r) => {
      r.d(t, { J2: () => d, QI: () => l, nk: () => c });
      var n = r(95125),
        i = r(72378);
      let a = { 'ngrok-skip-browser-warning': 'true' },
        s = () => i.A.get('accessToken') || '',
        l = () => i.A.get('account') || '',
        o = n.A.create({
          baseURL: 'https://d5ffe0dc8ad8.ngrok-free.app/api',
          headers: a,
        }),
        d = {
          toggleLike: async (e) =>
            (
              await o.post('/like', e, {
                headers: {
                  ...a,
                  Authorization: 'Bearer '.concat(s()),
                  addressWallet: l(),
                },
              })
            ).data,
          getAllLiked: async (e) =>
            (
              await o.get('/like/get-all?targetType='.concat(e), {
                headers: {
                  ...a,
                  Authorization: 'Bearer '.concat(s()),
                  addressWallet: l(),
                },
              })
            ).data,
        },
        c = {
          toggleFollow: async (e) =>
            (
              await o.post('/follow', e, {
                headers: {
                  ...a,
                  Authorization: 'Bearer '.concat(s()),
                  addressWallet: l(),
                },
              })
            ).data,
          getAllFollowed: async () =>
            (
              await o.get('/follow/get-all', {
                headers: {
                  ...a,
                  Authorization: 'Bearer '.concat(s()),
                  addressWallet: l(),
                },
              })
            ).data,
        };
    },
    93475: (e, t, r) => {
      r.d(t, { PF: () => c, v_: () => u });
      var n = r(51012),
        i = r(16836),
        a = r(43338),
        s = r(99794),
        l = r(95704);
      let o = '0xe76b09274f7b6681A65975449F9aB3175dd17E51';
      o ||
        console.warn(
          '⚠️ Thiếu biến NEXT_PUBLIC_MARKETPLACE_ADDRESS trong .env.local',
        );
      let d = [
        'function listItem(address nftAddress,uint256 tokenId,uint256 price) public returns (uint256)',
        'function cancelListing(uint256 listingId) public',
        'function updateListingPrice(uint256 listingId,uint256 newPrice) public',
        'function buyItem(uint256 listingId) public payable',
        'function createAuction(address nftAddress,uint256 tokenId,uint256 minPrice,uint256 durationSeconds) public returns (uint256)',
        'function placeBid(uint256 auctionId) public payable',
        'function finalizeAuction(uint256 auctionId) public',
        'function cancelAuction(uint256 auctionId) public',
        'function withdraw() public',
        'function pendingWithdrawals(address user) public view returns (uint256)',
        'function getListing(uint256 listingId) public view returns (tuple(address seller,address nftAddress,uint256 tokenId,uint256 price,bool active))',
        'function getAuction(uint256 auctionId) public view returns (tuple(address seller,address nftAddress,uint256 tokenId,uint256 minPrice,uint256 highestBid,address highestBidder,uint256 startTime,uint256 endTime,bool settled))',
      ];
      function c(e) {
        let t =
          null != e
            ? e
            : window.ethereum
              ? new n.k(window.ethereum)
              : new i.FR(
                  l.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.zerochain.network',
                );
        return new a.NZ(o, d, t);
      }
      let u = {
        listItem: async (e, t, r, n) => {
          let i = c().connect(e);
          return (await i.listItem(t, r, (0, s.g5)(n.toString()))).wait();
        },
        cancelListing: async (e, t) => {
          let r = c().connect(e);
          return (await r.cancelListing(t)).wait();
        },
        updateListingPrice: async (e, t, r) => {
          let n = c().connect(e);
          return (
            await n.updateListingPrice(t, (0, s.g5)(r.toString()))
          ).wait();
        },
        buyItem: async (e, t, r) => {
          let n = c().connect(e),
            i = await n.buyItem(t, { value: r });
          return (await i.wait(), i);
        },
        createAuction: async (e, t, r, n, i) => {
          let a = c().connect(e);
          return (
            await a.createAuction(t, r, (0, s.g5)(n.toString()), i)
          ).wait();
        },
        placeBid: async (e, t, r) => {
          let n = c().connect(e);
          return (await n.placeBid(t, { value: r })).wait();
        },
        finalizeAuction: async (e, t) => {
          let r = c().connect(e);
          return (await r.finalizeAuction(t)).wait();
        },
        cancelAuction: async (e, t) => {
          let r = c().connect(e);
          return (await r.cancelAuction(t)).wait();
        },
        withdraw: async (e) => {
          let t = c().connect(e);
          return (await t.withdraw()).wait();
        },
        getListing: async (e) => {
          let t = c(),
            r = await t.getListing(e);
          return {
            seller: r.seller,
            nftAddress: r.nftAddress,
            tokenId: r.tokenId,
            price: r.price,
            active: r.active,
          };
        },
        getAuction: async (e) => {
          let t = c(),
            r = await t.getAuction(e);
          return {
            seller: r.seller,
            nftAddress: r.nftAddress,
            tokenId: r.tokenId,
            minPrice: r.minPrice,
            highestBid: r.highestBid,
            highestBidder: r.highestBidder,
            startTime: r.startTime,
            endTime: r.endTime,
            settled: r.settled,
          };
        },
      };
    },
    93531: (e, t, r) => {
      r.d(t, { L: () => s });
      var n = r(99776),
        i = r(80549),
        a = r(84342);
      function s() {
        let e = (0, n.jE)();
        return (0, i.n)({
          mutationFn: (e) => a.J2.toggleLike(e),
          onMutate: async (t) => {
            let r = {
              nft: ['nft', t.targetId],
              artist: ['artist', t.targetId],
              post: ['post', t.targetId],
              comment: ['comment', t.targetId],
            }[t.targetType];
            await e.cancelQueries({ queryKey: r });
            let n = e.getQueryData(r);
            return (
              n &&
                e.setQueryData(r, (e) =>
                  e
                    ? {
                        ...e,
                        isLike: !e.isLike,
                        likeCount: e.isLike ? e.likeCount - 1 : e.likeCount + 1,
                      }
                    : e,
                ),
              { previousData: n }
            );
          },
          onError: (t, r, n) => {
            let i = {
              nft: ['nft', r.targetId],
              artist: ['artist', r.targetId],
              post: ['post', r.targetId],
              comment: ['comment', r.targetId],
            }[r.targetType];
            (null == n ? void 0 : n.previousData) &&
              e.setQueryData(i, n.previousData);
          },
          onSettled: (t, r, n) => {
            let i = {
              nft: ['nft', n.targetId],
              artist: ['artist', n.targetId],
              post: ['post', n.targetId],
              comment: ['comment', n.targetId],
            };
            e.invalidateQueries({ queryKey: i[n.targetType] });
          },
        });
      }
    },
  },
]);
