// ignore este archivo, es solo para buscar si dnv falla

const axios = require('axios');
const atob = require('atob');
const btoa = require('btoa');

const fs = require('fs');

streams = [
    { 'type': 'adaptive_hls', 'audio_locale': 'ja-JP', 'hardsub_locale': 'de-DE', 'url': 'https://v.vrv.co/evs3/5387602d294bdf82047ac09902aa7515/assets/ca2559e914fe1d1673e4e98d871fd219_,4902810.mp4,4902817.mp4,4902803.mp4,4902789.mp4,4902796.mp4,4902782.mp4,.urlset/master.m3u8?Expires=1673564515&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzUzODc2MDJkMjk0YmRmODIwNDdhYzA5OTAyYWE3NTE1L2Fzc2V0cy9jYTI1NTllOTE0ZmUxZDE2NzNlNGU5OGQ4NzFmZDIxOV8sNDkwMjgxMC5tcDQsNDkwMjgxNy5tcDQsNDkwMjgwMy5tcDQsNDkwMjc4OS5tcDQsNDkwMjc5Ni5tcDQsNDkwMjc4Mi5tcDQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTY3MzU2NDUxNX19fV19&Signature=eEr8Dm1-iBOGY78wkDCgy8CwJe5oP6yhSL9pZgp4GeXvl2R3crzoO1fFWRvPKDAMt3IctMS5LFzaVzb-8bOIytHsZIBa-Iap-969wmF7ZsqnwNkix5UW4Muhf5vv6A3vSQzFrWl-0X1eOvzQksmFte1DoHUCumpLR58Z0rg5A08ACKxp7basDCWEDUbBirRevTm11kTWA5l-Z~8GmFlXW27ZF52~WYlWPEFz~rF6XAnRjokmSTJzY5ytu6GL6nYBw1RuNm2jlq-sSlIz9pFWSfkWTVvbohaqEBhEZPz145BDuI3liXh8RfHANPKO9entfuExtZ0yBdX6GTtPJNb7Mw__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA' },
    { 'type': 'adaptive_hls', 'audio_locale': 'ja-JP', 'hardsub_locale': 'en-US', 'url': 'https://v.vrv.co/evs3/5387602d294bdf82047ac09902aa7515/assets/ca2559e914fe1d1673e4e98d871fd219_,4902804.mp4,4902811.mp4,4902797.mp4,4902783.mp4,4902790.mp4,4902776.mp4,.urlset/master.m3u8?Expires=1673564515&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzUzODc2MDJkMjk0YmRmODIwNDdhYzA5OTAyYWE3NTE1L2Fzc2V0cy9jYTI1NTllOTE0ZmUxZDE2NzNlNGU5OGQ4NzFmZDIxOV8sNDkwMjgwNC5tcDQsNDkwMjgxMS5tcDQsNDkwMjc5Ny5tcDQsNDkwMjc4My5tcDQsNDkwMjc5MC5tcDQsNDkwMjc3Ni5tcDQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTY3MzU2NDUxNX19fV19&Signature=U~6mUAxNC1fe3fQN81lRZt0-3tP7H4COTZBAV8sAFMlxaDicxIiN4ZdH8oYXPsynf9THYpbhCR~6fYWPyGvowqPkPQhM16awgP5voOXz5LTb66T4KdvCojMSrhjf9RzEZPf3h6VMba4X53vJyeTvi4UP7IoLVOU5xhSVh8O~Pzn2yBya783EobFcphQrwMeNIhNZkEDLXWUtqkC7FFcFNVw2OukBsYQxPotbsQDg1IQNvZ5UKiu5xRiFZ1JSMgQi6SO3M3woiFNyJLVziSjvdAiEv7lckp1ptk8agxziBDD9cBPQ3nV5gJNZVbwxamE0L0FLDpIMkQPnbi4GiQ3I6A__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA' },
    { 'type': 'adaptive_hls', 'audio_locale': 'ja-JP', 'hardsub_locale': 'es-ES', 'url': 'https://v.vrv.co/evs3/5387602d294bdf82047ac09902aa7515/assets/ca2559e914fe1d1673e4e98d871fd219_,4902806.mp4,4902813.mp4,4902799.mp4,4902785.mp4,4902792.mp4,4902778.mp4,.urlset/master.m3u8?Expires=1673564515&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzUzODc2MDJkMjk0YmRmODIwNDdhYzA5OTAyYWE3NTE1L2Fzc2V0cy9jYTI1NTllOTE0ZmUxZDE2NzNlNGU5OGQ4NzFmZDIxOV8sNDkwMjgwNi5tcDQsNDkwMjgxMy5tcDQsNDkwMjc5OS5tcDQsNDkwMjc4NS5tcDQsNDkwMjc5Mi5tcDQsNDkwMjc3OC5tcDQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTY3MzU2NDUxNX19fV19&Signature=gphVzpLbpsLCL80oXCGFXG2wzW1vDjbQrAWAldWnJ4OZETdERmhfMH8dGSnMFuFrxCTbDJmWzXoYS6jJMYxC55~brZreaOfxyrl0v8adjLyVQ5goQlVznnPYP7QismyBNaZuIMUMOcR9lgnGl2ZL~jV9LDi4xaSMmwbUenLN0q0TRzaSHmZuiXviv8--lhHBjUy72U93dSIaqerLSGlgndM5UdIl~4A~Y2exYaBFzxia8HQQfzWzd-H-LXtVk7X6wAod7vQRvaq5LtM~Xa67Sdov2qBgpdFDtrl6LHVg6o6-py3HyFv0n76i6Lbn~fG1eU5pcXjWMgjv~wYa~2zSzw__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA' },
    { 'type': 'adaptive_hls', 'audio_locale': 'ja-JP', 'hardsub_locale': 'fr-FR', 'url': 'https://v.vrv.co/evs3/5387602d294bdf82047ac09902aa7515/assets/ca2559e914fe1d1673e4e98d871fd219_,4902807.mp4,4902814.mp4,4902800.mp4,4902786.mp4,4902793.mp4,4902779.mp4,.urlset/master.m3u8?Expires=1673564515&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzUzODc2MDJkMjk0YmRmODIwNDdhYzA5OTAyYWE3NTE1L2Fzc2V0cy9jYTI1NTllOTE0ZmUxZDE2NzNlNGU5OGQ4NzFmZDIxOV8sNDkwMjgwNy5tcDQsNDkwMjgxNC5tcDQsNDkwMjgwMC5tcDQsNDkwMjc4Ni5tcDQsNDkwMjc5My5tcDQsNDkwMjc3OS5tcDQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTY3MzU2NDUxNX19fV19&Signature=hvc5LAwdp9x~zZTKP3cJyJAteSUmJdJpggDShST6H7KhajGig2-zBYejfzb5gyarRpTT2O6OSRZyONc8eENkA1ljenzXaHPRS9~B1afotiKIkyFWZc9raFpRJrHRHaWdtk4E3X9ZRI6UZ5q9A4XWyRDaW4YPqdvrD9WtWOhHe5cc7BlUNNzRHBT4ek~GGdPIqIBZ0wubxif-oClmSYtqC1RXC4xrjbPelr5xAMogOSkP0xa2vdM-hoe09CdvaOPTVu~qWExckIsmugiFl8kJcCqvAlZ16bh4wit2KxBb6s2Pjsis~osnb71oTwzdimS3Nyi4y1h-0M6naSfaUG5~Hg__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA' },
    { 'type': 'adaptive_hls', 'audio_locale': 'ja-JP', 'hardsub_locale': 'it-IT', 'url': 'https://v.vrv.co/evs3/5387602d294bdf82047ac09902aa7515/assets/ca2559e914fe1d1673e4e98d871fd219_,4902809.mp4,4902816.mp4,4902802.mp4,4902788.mp4,4902795.mp4,4902781.mp4,.urlset/master.m3u8?Expires=1673564515&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzUzODc2MDJkMjk0YmRmODIwNDdhYzA5OTAyYWE3NTE1L2Fzc2V0cy9jYTI1NTllOTE0ZmUxZDE2NzNlNGU5OGQ4NzFmZDIxOV8sNDkwMjgwOS5tcDQsNDkwMjgxNi5tcDQsNDkwMjgwMi5tcDQsNDkwMjc4OC5tcDQsNDkwMjc5NS5tcDQsNDkwMjc4MS5tcDQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTY3MzU2NDUxNX19fV19&Signature=UQNnwyUNj0QJCJsKXFlJApaFxgj665Y0zQdRjBf3fqkl2hGI983~xM2TKm2Sq4F~bPAknBzLvX8KopUwSSDUakjJyuP3E42utKHFlfWSC0~K~jQWEVLFraztndKxyJi33klpcTtnJCI4rQT2L3OWe7X5b7ezbTWbvhRfH5MMClQTUeTPzyGLORV~gtDCyR2E38FAD85fTwm6l2ZoNp32v9yolYbbR7dOuvL79F7wqvzz-olBcbWRjTeyRHB1r3loZbPJ8fZIx6QmsvCYJJ57lM0loMvFIfwyj1jjqx1ORC2nsRsYbnvKLXhYkx6gzB-ZXbmx9j996uqCklRxsrg3~w__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA' },
    { 'type': 'adaptive_hls', 'audio_locale': 'ja-JP', 'hardsub_locale': 'pt-BR', 'url': 'https://v.vrv.co/evs3/5387602d294bdf82047ac09902aa7515/assets/ca2559e914fe1d1673e4e98d871fd219_,4902808.mp4,4902815.mp4,4902801.mp4,4902787.mp4,4902794.mp4,4902780.mp4,.urlset/master.m3u8?Expires=1673564515&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzUzODc2MDJkMjk0YmRmODIwNDdhYzA5OTAyYWE3NTE1L2Fzc2V0cy9jYTI1NTllOTE0ZmUxZDE2NzNlNGU5OGQ4NzFmZDIxOV8sNDkwMjgwOC5tcDQsNDkwMjgxNS5tcDQsNDkwMjgwMS5tcDQsNDkwMjc4Ny5tcDQsNDkwMjc5NC5tcDQsNDkwMjc4MC5tcDQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTY3MzU2NDUxNX19fV19&Signature=nuP1rEanCIvksuDzVjQahYlslWGvCo6KnYQIgLcNMWdJh3otKUdPUnrgRIVkBIhpASG7XFS~RS62-lgrW7izIQ~xiFaYPX3c9XyHxsxPasV81Y3pr3LFD0bAjKJ9YYpA89HA1GdxH0~8aM8LbZAe62gUZcnoYVtCS~~Ds3Mfo4fMc28FJq83so69i5EY5Da51hAG9dg9iQV3kOtMdmJDuZtlaMQn4lXxpDfMFA5Cm3p5Fb3G3ipf0nHseuMDk0-doP8m~oJ8vH6lz8p4WPSGFip-GpQM6NXa0tASZdMqpbrPLFNt4qlu2aiQz-eaet3MVFkHZPY8dMIGJ0wqL8n68Q__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA' },
    { 'type': 'adaptive_hls', 'audio_locale': 'ja-JP', 'hardsub_locale': 'ru-RU', 'url': 'https://v.vrv.co/evs3/5387602d294bdf82047ac09902aa7515/assets/ca2559e914fe1d1673e4e98d871fd219_,4904595.mp4,4904597.mp4,4904593.mp4,4904591.mp4,4904589.mp4,4904587.mp4,.urlset/master.m3u8?Expires=1673564515&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzUzODc2MDJkMjk0YmRmODIwNDdhYzA5OTAyYWE3NTE1L2Fzc2V0cy9jYTI1NTllOTE0ZmUxZDE2NzNlNGU5OGQ4NzFmZDIxOV8sNDkwNDU5NS5tcDQsNDkwNDU5Ny5tcDQsNDkwNDU5My5tcDQsNDkwNDU5MS5tcDQsNDkwNDU4OS5tcDQsNDkwNDU4Ny5tcDQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTY3MzU2NDUxNX19fV19&Signature=RvGTVNC6efXtJUDImu0NMrgObMgweM8iVbVEBA-rhjfRNpCj-mIomDloxM5MCXojaBBLdYDo2q5XwwxOgaAaYXd4~DHs4g3b2AkJdM~uBwFTT8iubyDzLGibBvcsTZCyWy02P81eUgl~aYhJa~4AiH8DUztLvV4SoejhXsrtYH1ek8YkNW-mElmka~-zmKafmPa-I8yo7Zff5r9-ddDaaF2Kp-oquvs0mSNfyoBQYlNtn-dwrxP-lzyZaYBPawcQ8LoXZ~2LyRX~sihY4~i62r30VVwlCpeZWVsWFDff2IftDXbBL0dcPERdTErpthsvh70nnu6sBb1MUsnZr5XXoA__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA' },
    { 'type': 'adaptive_hls', 'audio_locale': 'ja-JP', 'hardsub_locale': 'ar-ME', 'url': 'https://v.vrv.co/evs3/5387602d294bdf82047ac09902aa7515/assets/ca2559e914fe1d1673e4e98d871fd219_,4904594.mp4,4904596.mp4,4904592.mp4,4904590.mp4,4904588.mp4,4904586.mp4,.urlset/master.m3u8?Expires=1673564515&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzUzODc2MDJkMjk0YmRmODIwNDdhYzA5OTAyYWE3NTE1L2Fzc2V0cy9jYTI1NTllOTE0ZmUxZDE2NzNlNGU5OGQ4NzFmZDIxOV8sNDkwNDU5NC5tcDQsNDkwNDU5Ni5tcDQsNDkwNDU5Mi5tcDQsNDkwNDU5MC5tcDQsNDkwNDU4OC5tcDQsNDkwNDU4Ni5tcDQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTY3MzU2NDUxNX19fV19&Signature=NfT7YWlx1d8L-rF9MM1TOLOvA9rRAGp81iorNshkUfeO7CZhvNDCKd5IztPSsIg0xRbgMIyt8bGqWgUi1lIpsXaFRFxVXrRb~PMlJeVUGlxt3D3jb8rSPpdVmCWipy-JnIMQMnwwK5CsELllheT~Cf1BOhIFKTXBVYYIKvOgb7NUNEfXTEGasH16H7Uc-6cy2BOzMA3U~2ZXy3dd4PJelCAnX0ha7rNqwqT1np4zDWvg1Tiz~fvkPgX5WKUPU0jNSN3UCh3JMjlaiSzwlbquMt-CxO3RAX2teq~8wlFB5nLNiTvxCt4xM8YXul-l1u4i5OZoGgiYrbV5G1j68YTuYw__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA' },
    { 'type': 'adaptive_hls', 'audio_locale': 'ja-JP', 'hardsub_locale': 'es-419', 'url': 'https://v.vrv.co/evs3/5387602d294bdf82047ac09902aa7515/assets/ca2559e914fe1d1673e4e98d871fd219_,4902805.mp4,4902812.mp4,4902798.mp4,4902784.mp4,4902791.mp4,4902777.mp4,.urlset/master.m3u8?Expires=1673564515&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzUzODc2MDJkMjk0YmRmODIwNDdhYzA5OTAyYWE3NTE1L2Fzc2V0cy9jYTI1NTllOTE0ZmUxZDE2NzNlNGU5OGQ4NzFmZDIxOV8sNDkwMjgwNS5tcDQsNDkwMjgxMi5tcDQsNDkwMjc5OC5tcDQsNDkwMjc4NC5tcDQsNDkwMjc5MS5tcDQsNDkwMjc3Ny5tcDQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTY3MzU2NDUxNX19fV19&Signature=Le~qULnGwE0LSbCX2yKoVTWkXGFmcOwlIuXWPhQEUWQewg9Al5RRCas6B1KmpMcQFVze9cOmBIE5KwJkE8cG7nKmmNVvEL4wGxTxOEkIyWZ6ToGLdauIdn2k0Tll4Q~xiVZKcAUrfeGSpA1pT3s6vmzA2VhfRQFMJqCbkPeRE9Gr~R4EOoN3E0B6j1S2iM-Ugo8TllDt0Iz21zO~plkXjOo5ge6NoFEK9rwCB~3TKba1nB47QKOcxE457Vnr~3w1ChzCAXoh32tJF-IOCoTMJANEDwVNTWzhQ1M9tOeLYW~NrXN6tf3UCTuX9vSPMrqlZ2TeRIUB~UCoyUJBMTjuig__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA' },
    { 'type': 'adaptive_hls', 'audio_locale': 'ja-JP', 'hardsub_locale': '', 'url': 'https://v.vrv.co/evs3/5387602d294bdf82047ac09902aa7515/assets/ca2559e914fe1d1673e4e98d871fd219_,4902530.mp4,4902531.mp4,4902529.mp4,4902527.mp4,4902528.mp4,4902526.mp4,.urlset/master.m3u8?Expires=1673564515&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzUzODc2MDJkMjk0YmRmODIwNDdhYzA5OTAyYWE3NTE1L2Fzc2V0cy9jYTI1NTllOTE0ZmUxZDE2NzNlNGU5OGQ4NzFmZDIxOV8sNDkwMjUzMC5tcDQsNDkwMjUzMS5tcDQsNDkwMjUyOS5tcDQsNDkwMjUyNy5tcDQsNDkwMjUyOC5tcDQsNDkwMjUyNi5tcDQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTY3MzU2NDUxNX19fV19&Signature=gWVw6k7KsTwO4Zo7JCYEQsH34UkA-HeEBNsT6XFcbwCuv-L6laV9pwrVeNqBPfLPHKRrQfDb2F7liacLgXd3O5FSwXGZQEgJ5U4hjsacFtofgxKq-EYFTEqD2tyYA~1mGhhfY99y4hvFY7olWICngDYeVCaeUJuasseUXof7BR7yAbJRIA40Rrzch092eMOQoPXwzAmiryHYZI9s~96cU4B1zbKUWqQCmnkcN9J9xjKDmrSofR3gKo8elyaPYVwklglzYDM4IxO86DUUuZx5VwZJTUKj3FihUHChGecEO9ADKo2s1F5~aCYyioz169TMbylCj4NstV7YkoAud8o07Q__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA' }
];
// str=`https://pl.crunchyroll.com/evs1/db4c26cfee449ad7f08598c8bbf2eac4/assets/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,.urlset/manifest.mpd?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzMS9kYjRjMjZjZmVlNDQ5YWQ3ZjA4NTk4YzhiYmYyZWFjNC9hc3NldHMvODg0YzM2Mzk1ZDM0NjA2MmU2NjRkMjg1ZWM0YWE2ZWFfLDQwMDM3OTIubXA0LDQwMDM3OTYubXA0LDQwMDM3ODgubXA0LDQwMDM3ODAubXA0LDQwMDM3ODQubXA0LC51cmxzZXQvbWFuaWZlc3QubXBkIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjE2NzE4MzgxfX19XX0_&Signature=Me9A1hTatQC-Z6MjkldrwqDThwgdnGAKp72auK1Qju1d-gAwPflihXZ3mLynCnxlV8bH6DgvkMZaMeaRBkoETAwvgjpDoarM~HOenEuERkmlICCq4UbwBtyTeDGrGsMTNiSo~-ia0z3nk~EmAxV0tSNfL6h-~NWvkeNBjK9TTkYw-6Led4f2lNRYCeQMAWTYVMYuxKHqCGitecd4Xn4DgepHnmH6qIyQk-Srt7oTj4Q4OTm5RAland42f8-6hpl18Ma9bGnA63wgRar23QXB3uvlLpewVLfI08CD1rYHjP6s62yELVTJMLRhQidIZ0MZfaMm3V80NtA4H9uW4RZsQw__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA
// https://pl.crunchyroll.com/evs1/db4c26cfee449ad7f08598c8bbf2eac4/assets/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,.urlset/master.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzMS9kYjRjMjZjZmVlNDQ5YWQ3ZjA4NTk4YzhiYmYyZWFjNC9hc3NldHMvODg0YzM2Mzk1ZDM0NjA2MmU2NjRkMjg1ZWM0YWE2ZWFfLDQwMDM3OTIubXA0LDQwMDM3OTYubXA0LDQwMDM3ODgubXA0LDQwMDM3ODAubXA0LDQwMDM3ODQubXA0LC51cmxzZXQvbWFzdGVyLm0zdTgiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MTY3MTgzODF9fX1dfQ__&Signature=WnHn5dl-VpQa64hD58bRKGielQImaXhQlV2RS-L6N07C7cSWUlbhSaWpImS7VnEZbt1hKMdTyBbAOVCoHsZ4-V-0KZ~9ms5PdSgrQHgxKlc5S4pLfFyaU6fAXkc7QzasN1Icu9oBpkdzs83TJi1jAi220b3ZL6a1PSH-rUQafXiKx89RtFcRwwy0mI71hSMvvbtYw2GGapK-6sti5EV6qpYhhZDltEsPvAmCQ~Z~~NHKxD1FL~7q66KTW301RVzzDAAaCKmsEX-lROKtdJLg~eGiCo9Lg6taemSYFr~T4k7OjyPC~qY5a5IOYyhxb46tIXHnKi-QoZbgb-5ka7k9sA__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA
// https://pl.crunchyroll.com/evs1/cfc7fb015fd507d3fdfad53c10843713/assets/p/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,.urlset/manifest.mpd?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzMS9jZmM3ZmIwMTVmZDUwN2QzZmRmYWQ1M2MxMDg0MzcxMy9hc3NldHMvcC84ODRjMzYzOTVkMzQ2MDYyZTY2NGQyODVlYzRhYTZlYV8sNDAwMzc5Mi5tcDQsNDAwMzc5Ni5tcDQsNDAwMzc4OC5tcDQsNDAwMzc4MC5tcDQsNDAwMzc4NC5tcDQsLnVybHNldC9tYW5pZmVzdC5tcGQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MTY3MTgzODF9fX1dfQ__&Signature=iV~LmCD09qB8Y2atJJIseCjX1VPPoMWG0KCZl~CcxJazIKIrkSNuZK8DyDIxi5bn1iO9d0iVERotBkV0BHY1S2q2hUKr05glajKPRYCg4yt6YV7~xn2eIY83iqu3PUpW4imzatKmKdrrtV8yoRMyIVfz2xmos8gT-aYjaFFI7ddu7nL9UEJ3h2lAte3zOPBL0cRuiF~znTLK4BujvKO2NQr4PMCDak5ikWccPaOBvirzuvg6DAqtzqI1h3N5WYtbPCR1SfKPP-jVs214ZX6iMAoSxVV1XbUBPr13tHQB4Xbu6f~72oR-~~UQFhdXVGJgvkGLmm8CZfW-zM7LcYFSvg__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA
// https://pl.crunchyroll.com/evs1/cfc7fb015fd507d3fdfad53c10843713/assets/p/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,.urlset/master.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzMS9jZmM3ZmIwMTVmZDUwN2QzZmRmYWQ1M2MxMDg0MzcxMy9hc3NldHMvcC84ODRjMzYzOTVkMzQ2MDYyZTY2NGQyODVlYzRhYTZlYV8sNDAwMzc5Mi5tcDQsNDAwMzc5Ni5tcDQsNDAwMzc4OC5tcDQsNDAwMzc4MC5tcDQsNDAwMzc4NC5tcDQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYxNjcxODM4MX19fV19&Signature=cdT1tFBH9BudyeZ~Cx9EgwyuETw-fCHpjuGLEtNXvcgjAAh0A8sCFondK00m~JgcZC2bH44AoJ7zwS0XVozd01wJK7WWqGDXeaqeJiA1xi7M2Q5iOHQE7K767CAPDEGWReV2f2OViWK2jAZM95ZJwhEEuPMvtEBXtEVbJ9ot9iz-fkf5RXkY0w3S4keObdluQ9gzs6dtBULM1ZxEoUqpbTWa4jTyMp04ytCM15kEWNlBwKhbIEnRzvSC0lJVts5x~V1aaRUGcHWwrxS5Q85QSbs2HEYGgCkXC2j9yDrPnLvdw6zAL69XCb9izlcmSqTVWXNPo7Cz1jI2o4dWFq9mQg__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA
// https://pl.crunchyroll.com/evs1/cfc7fb015fd507d3fdfad53c10843713/assets/p/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,243319.txt,.urlset/master.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzMS9jZmM3ZmIwMTVmZDUwN2QzZmRmYWQ1M2MxMDg0MzcxMy9hc3NldHMvcC84ODRjMzYzOTVkMzQ2MDYyZTY2NGQyODVlYzRhYTZlYV8sNDAwMzc5Mi5tcDQsNDAwMzc5Ni5tcDQsNDAwMzc4OC5tcDQsNDAwMzc4MC5tcDQsNDAwMzc4NC5tcDQsMjQzMzE5LnR4dCwudXJsc2V0L21hc3Rlci5tM3U4IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjE2NzE4MzgxfX19XX0_&Signature=EOL6E8bH5BnX4~740OyVLPwsVL6CDM3y1W39ByWukP48qyyAxAC4OSLlbQDXxGZebgkgzDCbY0Qw8Mh5qsQTg-uuGQ7l-6cQlBQs7eXu0GPwKOjD7f2sUE3dpDufQh2lQo2gDsMC6Stgf5c2h8-HXhJMZPqOrAevoQj6xQCbgxuEODiLI7bcjPOqulXmANbMN21cN80Yo2dEqYFQUAZ-kCa5kZramn5rZSPeH5HTVfvITDnwdYMqTCRcdSJ5CeTLlqGDBgVg9kBlx6sv4IkPZsYqvDCbtagRmoHdfRPEgFmKanFX4tzD8f0GlF-nBhYDFayr8pCN5K4SlIai~MBMUw__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA
// https://pl.crunchyroll.com/evs1/db4c26cfee449ad7f08598c8bbf2eac4/assets/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,243319.txt,.urlset/master.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzMS9kYjRjMjZjZmVlNDQ5YWQ3ZjA4NTk4YzhiYmYyZWFjNC9hc3NldHMvODg0YzM2Mzk1ZDM0NjA2MmU2NjRkMjg1ZWM0YWE2ZWFfLDQwMDM3OTIubXA0LDQwMDM3OTYubXA0LDQwMDM3ODgubXA0LDQwMDM3ODAubXA0LDQwMDM3ODQubXA0LDI0MzMxOS50eHQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYxNjcxODM4MX19fV19&Signature=C0tjTCjl5E4xb1lpKzOZAbBbgMgifArEAUgdA1Jam-3d11qBs5TFnXporUgK5YVOV-mIT3xRmysjl7thHfMSXwlejWCSKxaJMe4A80NJIJ65NedPyCYEdr7J7662ffZ02opkEXMrrz9oWcT7b~orkh6H7oF7RfMlHxJ5z71473Pz~WARsdS5dhdyyw4lln7QvyDOebxBp0aaumXW2w6oD2y9GT~~egyMRYIU6Sh1i0c9jyKXtZJAXQBIDv6~R1~RPhxrxtyPVYfYV2DfqxNeZ18Llma-VxJvC1w~mi34b6OqWQQyv9~KxbPrabJPsuQZvo7VjRfFGd3~5hm5-2CODQ__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA
// https://v.vrv.co/evs1/db4c26cfee449ad7f08598c8bbf2eac4/assets/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,.urlset/manifest.mpd?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly92LnZydi5jby9ldnMxL2RiNGMyNmNmZWU0NDlhZDdmMDg1OThjOGJiZjJlYWM0L2Fzc2V0cy84ODRjMzYzOTVkMzQ2MDYyZTY2NGQyODVlYzRhYTZlYV8sNDAwMzc5Mi5tcDQsNDAwMzc5Ni5tcDQsNDAwMzc4OC5tcDQsNDAwMzc4MC5tcDQsNDAwMzc4NC5tcDQsLnVybHNldC9tYW5pZmVzdC5tcGQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MTY3MTgzODF9fX1dfQ__&Signature=DH6Kd9fIos44dxBj-FXvNwXHer5Qtnv-QH4kt5Oml2EhOM7XAQtoMZoOOhzKMX2r7eZheHgFLsUXuQroI6aEENpoJZYeFCRqYUiJZVb1UDOLFUM4JTr8hwFPU8rdGMQ5ggLAj0IzgLpAQsWnOcrn-rTSysWPN~ZPQaHyFCL~eOmD05tz79y0M2-TpX9C6mEWUMeEOVXlZnHRTK1Q8LhcvNKnQ450XmHGV~708R5-P4xfvzccG~5gdzPJLbSS-qQedJlZ888nXypRok~Kz7SNGsV~KaeeAUBBXamKp0PPTJ0ik-jS3kavfKj-gqhRVUAlyRudoCqLDuYWSYFbMgbmXA__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA
// https://v.vrv.co/evs1/db4c26cfee449ad7f08598c8bbf2eac4/assets/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,.urlset/master.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly92LnZydi5jby9ldnMxL2RiNGMyNmNmZWU0NDlhZDdmMDg1OThjOGJiZjJlYWM0L2Fzc2V0cy84ODRjMzYzOTVkMzQ2MDYyZTY2NGQyODVlYzRhYTZlYV8sNDAwMzc5Mi5tcDQsNDAwMzc5Ni5tcDQsNDAwMzc4OC5tcDQsNDAwMzc4MC5tcDQsNDAwMzc4NC5tcDQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYxNjcxODM4MX19fV19&Signature=NnTOStyuce-dVPWc6monjxjWYBhlFoemHjGc8s3q1snIhi5qveF4tfqT~XZ3b7H93~KFQeDftuXhg8KFbWJUsjefMBiTyJcjayorj6lIBgMiNCuTtT2i-qSHYLENfffK3TFYrC51CmZTOkI6ngfvlKD~ajWr7L1N0sh8Nj4hH~pnpmpyg4SEheaJ~xUw87exysl42owVe1yiFj2ozUDh9b0O90xdIZhvgjkPxEC6EOedDb7ANWLu8eQ4q0Y-N-gWPATLo0Dht-pNTp0NMGpjGn6vNlmuuoX5uQJP02bPrb4HIXuuuu4OgkJJE~SwvZiqjuZ5BC7gCCsJs1NFjGcnow__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA
// https://v.vrv.co/evs1/cfc7fb015fd507d3fdfad53c10843713/assets/p/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,.urlset/manifest.mpd?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly92LnZydi5jby9ldnMxL2NmYzdmYjAxNWZkNTA3ZDNmZGZhZDUzYzEwODQzNzEzL2Fzc2V0cy9wLzg4NGMzNjM5NWQzNDYwNjJlNjY0ZDI4NWVjNGFhNmVhXyw0MDAzNzkyLm1wNCw0MDAzNzk2Lm1wNCw0MDAzNzg4Lm1wNCw0MDAzNzgwLm1wNCw0MDAzNzg0Lm1wNCwudXJsc2V0L21hbmlmZXN0Lm1wZCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYxNjcxODM4MX19fV19&Signature=ofK5Lo6oBgV5MT0Z35DbrWH49iAW6SwOn0IqF0Vty4uhpOO3XgL49WImIUw-iD3Noq9b1EduSyY3qCZJStiXsctlG-pkKB0jv3gtFWbwzwZ4cKBEivhlafC5Qn-ZHmkb5rLj1aVWONEe4tDnayOxTFOXBJTDq~mnjtds52N5jK2mftpsFs~ky2JdrUU-LmEWIA-Gys809Poi7reVu2b9hqevOoyg35TgmatrSYzD3EpbpDGWeDJK6FfFod84jLebbj5CzFoiwCSQsdkbe633ZiIPDxp3Ahe-K0aQSJF87atYUqeJxiuPUVyJ2mBLY00SoXo8ME3qoQYPIN7s0UyKzg__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA
// https://v.vrv.co/evs1/cfc7fb015fd507d3fdfad53c10843713/assets/p/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,.urlset/master.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly92LnZydi5jby9ldnMxL2NmYzdmYjAxNWZkNTA3ZDNmZGZhZDUzYzEwODQzNzEzL2Fzc2V0cy9wLzg4NGMzNjM5NWQzNDYwNjJlNjY0ZDI4NWVjNGFhNmVhXyw0MDAzNzkyLm1wNCw0MDAzNzk2Lm1wNCw0MDAzNzg4Lm1wNCw0MDAzNzgwLm1wNCw0MDAzNzg0Lm1wNCwudXJsc2V0L21hc3Rlci5tM3U4IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjE2NzE4MzgxfX19XX0_&Signature=ItMbS6Iy1TZz~T3rOIbzBCxY6SQv~NR9WHs3bv1l9rukspAKmDXUP9t8kYMbRwglzbf4xAEFPxvt0m9mQs8uWnaQSatYYqajc1E8GCT9C6wjVhJzYZRRBnW-meqbivpelx-Un~sU9QOcLrCoXjIJfAM6zTmf5uPSHpuzL5NezAkrnzqq41v1z201shju19N9KT68pcAWODz4rrLjIUw5UFk5hFTRR6cmXokVDJ1VkDeaTihZXuIrnc3z-v946Bw~A9hlkUpEQcOGdWgcAqBxVGh6YQ7wDXE88QIaVBDkXpbzrzShT0J7pfZNXfKM0s-m5LYtYiOxHMUGsiygYZTifA__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA`;

// works=`https://pl.crunchyroll.com/evs1/cfc7fb015fd507d3fdfad53c10843713/assets/p/884c36395d346062e664d285ec4aa6ea_,4003435.mp4,4003436.mp4,4003434.mp4,4003432.mp4,4003433.mp4,.urlset/manifest.mpd?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzMS9jZmM3ZmIwMTVmZDUwN2QzZmRmYWQ1M2MxMDg0MzcxMy9hc3NldHMvcC84ODRjMzYzOTVkMzQ2MDYyZTY2NGQyODVlYzRhYTZlYV8sNDAwMzQzNS5tcDQsNDAwMzQzNi5tcDQsNDAwMzQzNC5tcDQsNDAwMzQzMi5tcDQsNDAwMzQzMy5tcDQsLnVybHNldC9tYW5pZmVzdC5tcGQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MTY3MTgzODF9fX1dfQ__&Signature=L39YqmXEJKfKwowvSTtiYhLLkbGCJBxjPwK8AtK1gbosPUCm0Xa8PLoFvkROFZIKv0q~O12e4ajWOePEVcXjzkhMZXNo2z7HWKYjq7XpmCw3EAAILEguuMQ-T8w1wKVeFfBiGzDR1yKl7ivORSxTC8zarFaMKNl5yY--WDqiyobsEeCA-drKp4pqC9LX1YDI8fhKYazBSnM4GSobnetwUje6Xo2GJgoki8KWjaO1VxpmYZzYnwadZNnuhx1CMu9fLyWYzR3I7hpUf2haSL9mCt6PIxWIVLwBiWiLWblMqfp6UaO2KYfMj1Pw41c0388YZNUuzf9mI1e6S6gbVprddA__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA`
// urls = str.split('\n');

// drm_adaptive_dash || drm_adaptive_hls
for (let s of streams)
    if (s.format !== 'erm_adaptive_dash$$$$$$') {
        let manifest = s.url.replace('v.vrv.co', 'dl.v.vrv.co').replace('pl.crunchyroll.com', 'dl.v.vrv.co').replace('dl.v.vrv.co', 'v.vrv.co').replace('master.m3u8', 'manifest.mpd').replace('evs1', 'evs').replace('assets/8', 'assets/p/8');
        manifest = remakeUrl(s.url).replace('master.m3u8', 'manifest.mpd');
        //.replace('assets/p/', 'assets/')
        // AAA.replace("master.m3u8", "manifest.mpd").replace(AAA.split("/")[2], "dl.v.vrv.co").replace("evs1", "evs");
        mafinest = s.url.replace('v.vrv.co', 'fy.v.vrv.co').replace('master.m3u8', 'manifest.mpd').replace('evs1', 'evs');

        lookup(manifest);
    }
//lookup('https://pl.crunchyroll.com/evs/6b243432d3d162b08e3e3c256910a358/assets/6b243432d3d162b08e3e3c256910a358_4015612.mp4/clipFrom/0000/clipTo/120000/manifest.mpd?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzLzZiMjQzNDMyZDNkMTYyYjA4ZTNlM2MyNTY5MTBhMzU4L2Fzc2V0cy82YjI0MzQzMmQzZDE2MmIwOGUzZTNjMjU2OTEwYTM1OF80MDE1NjEyLm1wNC9jbGlwRnJvbS8wMDAwL2NsaXBUby8xMjAwMDAvbWFuaWZlc3QubXBkIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjE2OTQ3MDU0fX19XX0_&Signature=WkqyfbEuAxDdnD4cKSf8xRZV2gDXmgmbitdauqz8l6QdXrt3Aq9GOohJbIqhRltJa~VSy~wmKwlmheJNSdy8HBais0wMOl~dOWHX3QqbhouU2Liet9RB0V7bhN-0VbyBDY06Cx1f22gbalf9GWsA1lDqvA419SvPLr8NQXqB45YujNbnrNKRtkQYJjvuwW-uJbPdvdTgQUtxm3EqBvzIRKK9ij6dClf20AOgBMXNAEk0YL-mOegp6t9btQBMe~KRc~lN3u-JoZ~0ghYvkM3U-tc2b0xf5RHUE7hq-GvAHJX6j8HHYAdSqOcl4cjCCP8xU5bKZP-X9n4EzrmUyvEvsg__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA');

works = [1, 3, 8, 9];
works = [1, 6, 7, 8];
//lookup(streams[1].url)

const r = { 0: '720p', 1: '1080p', 2: '480p', 3: '360p', 4: '240p' };

let curfs = 0;
function lookup(current_url) {
    video_dash_playlist_url_old = current_url; //.replace('pl.crunchyroll.com', 'v.vrv.co');
    video_dash_playlist_url = current_url;

    axios
        .get(video_dash_playlist_url_old)
        .then(result => {
            const data = result.data;
            fs.writeFileSync('./fs' + curfs++ + '.xml', data);

            const auth = pegaString(data, '\\.(?:mp4|m4s)\\?', '"', 0);
            let params_download_link = htmlDecode('?' + auth);
            params_download_link = params_download_link.replace(/&t=.*$/, '');
            params_download_link = params_download_link.replace(/(&|\?)Expires=\d+&/, '$1');
            if (!params_download_link) return;

            function linkDownload(id) {
                let video_code = video_dash_playlist_url.split(',')[id + 2];
                let video_mp4_url = video_dash_playlist_url.split(/_(?:,|\*)/)[0] + '_' + video_code + params_download_link;
                let links = [];

                // ALTERNATE
                video_mp4_url = fixPolicy(video_mp4_url, '1769000').replace('120000', '1769000');
                //video_mp4_url = fixPolicy('https://pl.crunchyroll.com/evs/6b243432d3d162b08e3e3c256910a358/assets/6b243432d3d162b08e3e3c256910a358_4015612.mp4/clipFrom/0000/clipTo/1769000/manifest.mpd?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzLzZiMjQzNDMyZDNkMTYyYjA4ZTNlM2MyNTY5MTBhMzU4L2Fzc2V0cy82YjI0MzQzMmQzZDE2MmIwOGUzZTNjMjU2OTEwYTM1OF80MDE1NjEyLm1wNC9jbGlwRnJvbS8wMDAwL2NsaXBUby8xMjAwMDAvbWFuaWZlc3QubXBkIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjE2OTQ3MDU0fX19XX0_&Signature=WkqyfbEuAxDdnD4cKSf8xRZV2gDXmgmbitdauqz8l6QdXrt3Aq9GOohJbIqhRltJa~VSy~wmKwlmheJNSdy8HBais0wMOl~dOWHX3QqbhouU2Liet9RB0V7bhN-0VbyBDY06Cx1f22gbalf9GWsA1lDqvA419SvPLr8NQXqB45YujNbnrNKRtkQYJjvuwW-uJbPdvdTgQUtxm3EqBvzIRKK9ij6dClf20AOgBMXNAEk0YL-mOegp6t9btQBMe~KRc~lN3u-JoZ~0ghYvkM3U-tc2b0xf5RHUE7hq-GvAHJX6j8HHYAdSqOcl4cjCCP8xU5bKZP-X9n4EzrmUyvEvsg__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA', '1769000');
                //video_dash_url = 'https://pl.crunchyroll.com/evs/6b243432d3d162b08e3e3c256910a358/assets/6b243432d3d162b08e3e3c256910a358_4015612.mp4,.urlset/manifest.mpd?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzLzZiMjQzNDMyZDNkMTYyYjA4ZTNlM2MyNTY5MTBhMzU4L2Fzc2V0cy82YjI0MzQzMmQzZDE2MmIwOGUzZTNjMjU2OTEwYTM1OF80MDE1NjEyLm1wNC9jbGlwRnJvbS8wMDAwL2NsaXBUby8xMjAwMDAvbWFuaWZlc3QubXBkIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjE2OTQ3MDU0fX19XX0_&Signature=WkqyfbEuAxDdnD4cKSf8xRZV2gDXmgmbitdauqz8l6QdXrt3Aq9GOohJbIqhRltJa~VSy~wmKwlmheJNSdy8HBais0wMOl~dOWHX3QqbhouU2Liet9RB0V7bhN-0VbyBDY06Cx1f22gbalf9GWsA1lDqvA419SvPLr8NQXqB45YujNbnrNKRtkQYJjvuwW-uJbPdvdTgQUtxm3EqBvzIRKK9ij6dClf20AOgBMXNAEk0YL-mOegp6t9btQBMe~KRc~lN3u-JoZ~0ghYvkM3U-tc2b0xf5RHUE7hq-GvAHJX6j8HHYAdSqOcl4cjCCP8xU5bKZP-X9n4EzrmUyvEvsg__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA';
                //video_dash_url = video_dash_url.replace(video_dash_url.split("_")[0] + "_", video_dash_url.split("_")[0] + "_,");
                //video_mp4_url = video_dash_url

                links.push(video_mp4_url);
                links.push(normalize(video_mp4_url));
                links.push(useEvs1(video_mp4_url, true));
                links.push(useEvs1(video_mp4_url, false));
                links.push(useEvs1(normalize(video_mp4_url), true));
                links.push(useEvs1(normalize(video_mp4_url), false));
                links.push(useP(video_mp4_url, false));
                links.push(useP(normalize(video_mp4_url), false));
                links.push(useP(useEvs1(video_mp4_url, true), false));
                links.push(useP(useEvs1(video_mp4_url, false), false));
                links.push(useP(useEvs1(normalize(video_mp4_url), true), false));
                links.push(useP(useEvs1(normalize(video_mp4_url), false), false));
                links.push(useP(video_mp4_url, true));
                links.push(useP(normalize(video_mp4_url), true));
                links.push(useP(useEvs1(video_mp4_url, true), true));
                links.push(useP(useEvs1(video_mp4_url, false), true));
                links.push(useP(useEvs1(normalize(video_mp4_url), true), true));
                links.push(useP(useEvs1(normalize(video_mp4_url), false), true));

                // DIRECTO
                links.push(video_mp4_url);
                links.push(useP(useEvs1(normalize(video_mp4_url), true), false));
                links.push(useP(useEvs1(video_mp4_url, true), false));
                links.push(remakeUrl(video_mp4_url));

                if (!isValid(video_mp4_url) && false) {
                    console.log('---------------- BAD POLICY ----------------');
                    console.log('url:   ', getClean(video_mp4_url));
                    console.log('policy:', getPolicy(video_mp4_url));
                    console.log('p:     ', getPolicy(video_mp4_url, 4) === getClean(video_mp4_url, 4));
                    return;
                }

                let i = 0;
                for (link of links) {
                    const staticlink = link.replace('http*', 'https'); //.replace('/120000/', '/1769000/');
                    setTimeout(() => {
                        setTimeout(() => search(video_dash_playlist_url, staticlink.replace(/(?:v\.vrv\.co|pl\.crunchyroll\.com)/, 'v.vrv.co')), 0);
                        setTimeout(() => search(video_dash_playlist_url, staticlink.replace(/(?:v\.vrv\.co|pl\.crunchyroll\.com)/, 'pl.crunchyroll.com')), 500);
                        setTimeout(() => search(video_dash_playlist_url, staticlink.replace(/(?:v\.vrv\.co|pl\.crunchyroll\.com)/, 'dl.v.vrv.co')), 1000);
                        setTimeout(() => search(video_dash_playlist_url, staticlink.replace(/(?:v\.vrv\.co|pl\.crunchyroll\.com)/, 'a-vrv.akamaized.net')), 1500);
                    }, i * 2000);
                    i++;
                }
            }

            //for (id in r)
            linkDownload(1);
        })
        .catch(err => {
            console.log('---------------- EXCEPTION ----------------');
            console.log('isValid:', isValid(video_dash_playlist_url_old));
            console.log('url:    ', video_dash_playlist_url_old);
            console.log('throws: ', err);
        });
}

function search(manifest, video) {
    axios
        .get(video)
        .then(r => {
            console.log('-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-! FOUND !-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-');
            console.log(video);
        })
        .catch(err => {
            console.log('---------------- NOT FOUND ----------------');
            //console.log(video);
            console.log('playlist:', getClean(manifest));
            console.log('to:      ', getClean(video));
            console.log('code:    ', err.response?.status ?? 0);
        });
}

function isManifest(url) {
    return url.includes('manifest.mpd');
}

function useP(url, condition) {
    if (condition) return url.replace('/assets/p/', '/assets/');
    else return url.replace('/p/', '/');
}

function useEvs1(url, condition) {
    if (condition) return url.replace('/evs/', '/evs1/');
    else return url.replace('/evs1/', '/evs/');
}

function normalize(url) {
    return url.replace(getClean(url, 4), getPolicy(url, 4));
}

function isValid(url) {
    try {
        const policystr = getPolicy(url).slice(0, -1);
        return getClean(url).startsWith(policystr);
    } catch (err) {
        return false;
    }
}

function getClean(url, slashPos) {
    const resource = pegaString(url, '^', '\\?');
    if (slashPos) return resource.split('/')[slashPos];
    return resource;
}

function getPolicy(url, slashPos) {
    const str = atob(pegaString(url, 'Policy=', '_&')).replace('http*', 'https').trim();
    const stt = JSON.parse(str);
    const resource = stt.Statement[0].Resource;
    if (slashPos) return resource.split('/')[slashPos];
    return resource;
}

function fixPolicy(url, toClip) {
    const policy = pegaString(url, 'Policy=', '_&');
    const str = atob(policy)
        .replace('/120000/', '/' + toClip + '/')
        .trim();
    const newPolicy = 'Policy=' + btoa(str).replaceAll('=', '_') + '&';
    return url.replace(policy, newPolicy);
}

function remakeUrl(url) {
    const policy = getPolicy(url);
    return policy + '?' + url.replace(/^.*\?/, '');
}

function htmlDecode(input) {
    const decoded = input.replaceAll('&amp;', '&');
    return decoded;
}

function pegaString(str, first_character, last_character, pos = 0) {
    if (str.match(first_character + '(.*?)' + last_character) == null) {
        return '';
    } else {
        matches = str.matchAll(first_character + '(.*?)' + last_character);
        while (pos-- > 0) matches.next();
        new_str = matches.next().value[1].trim();
        return new_str;
    }
}

function getPolicy(url, slashPos) {
    const token = pegaString(url, 'Policy=', '&');
    console.log(token);
    const str = atob(token).trim();
    console.log(str);
    const stt = JSON.parse(str);
    const resource = stt.Statement[0].Resource;
    if (slashPos) return resource.split('/')[slashPos];
    return resource;
}