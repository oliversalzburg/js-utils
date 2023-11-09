import { random } from "../random.js";

let PALETTE_INDEX = 0;

/**
 * Color palettes that can be used to quickly colorize a drawing.
 * @group Graphics
 */
export const PALETTES = [
  [
    0xc2b799, 0xa6a183, 0xc5bfa7, 0x6d624e, 0xa8987e, 0xc1bca6, 0xe3decb, 0x896b51, 0x744d26,
    0xa57d49, 0xa58147, 0xdfd6b9, 0xddcaac, 0x9e8b6a, 0xa4acae, 0xc2b39c, 0x3a6494, 0x5fa0b2,
    0xa6795c, 0xbcae91, 0xbeb8a8, 0xdfd6c5, 0x8d4f40, 0xa77157, 0x616453, 0xf9faec, 0xfafbe9,
    0xc9b38e, 0xa56e4f, 0x633f27, 0x57686f, 0xa7bcb5, 0x4cb1b9, 0xb1ab9d, 0x635d4d, 0x153854,
    0xa15347, 0xa2725b, 0xa38062, 0x2b2b1f, 0xfbfffc, 0x4c392a, 0x77a9b0, 0x839295, 0x2b476c,
    0x65afae, 0x97988a, 0xa4a095, 0x1f4258, 0x895138, 0x615b41, 0xba8563, 0xaea898, 0xeec9b9,
    0xfafbf6, 0x4e4026, 0x4795a1, 0x144772, 0x0b7291, 0x8f8876, 0xe0daca, 0xece3d4, 0xe5dccb,
    0xded8c8, 0x86837c, 0x5d949b, 0xaaa496, 0xcfc6b7, 0xb6ba9f, 0xc0cacc, 0x6a9fa5, 0x2b7b86,
    0x6c7a7b, 0xb6aa92, 0xcbc0aa, 0xcfc4b0, 0xccc4b1, 0xcec2ac, 0xcec1ae, 0x76888c, 0x7b887f,
    0xb6beb1, 0x8d6e3f, 0x231d07, 0x278496, 0x03447e, 0x06070c, 0xa69277, 0xac9374, 0xaa9270,
    0xad956f, 0xac9671, 0xab9b81, 0x68858d, 0x466867, 0xbfc2b9, 0xf7fbe4, 0x12150c, 0x282c38,
    0x232b52, 0xc0b19c, 0x5f310f, 0x90370b, 0x571a05, 0xaa5924, 0xcc8046, 0x75340a, 0x2b879e,
    0xab9b84, 0x7a6344, 0xbca385, 0x333021, 0x825c45, 0x4c2714, 0x86523a, 0x998773, 0xb75822,
    0xd1722e, 0x983609, 0x592611, 0x846749, 0x0e87b6, 0xad7538, 0x27170a, 0x7d583b, 0xecece2,
    0xc3b8a4, 0xc2bdba, 0x9a9486, 0xb36841, 0x96441c, 0x851f09, 0x98350e, 0xba510d, 0xc89369,
    0xe0d9cf, 0x2691bf, 0x3a8eb0, 0xd0b691, 0xbf9474, 0x697486, 0x6d7d8d, 0xa93353, 0xda7a0a,
    0xcc5b0d, 0x53321f, 0xc45220, 0xce641a, 0x42240c, 0xccc6ba, 0xa9c4cf, 0x2588b2, 0xebe5d7,
    0xaf754f, 0xb63259, 0xda6689, 0x0b417d, 0xdd7b16, 0xdb862c, 0x180400, 0x070000, 0xaf6f54,
    0xaca89f, 0xf1e9de, 0x2082a7, 0x4490b2, 0xe1dbcb, 0xbe9158, 0x2385b4, 0x2488b9, 0xdbcfc3,
    0xaa5921, 0x95411d, 0xd25610, 0xa93e14, 0x9b4709, 0xf4eee2, 0xede5da, 0xf2ece0, 0xbfc2bb,
    0xe2e2d6, 0xc5b9a1, 0xd9d0c1, 0x367797, 0x2989bb, 0x6c3727, 0xa94c13, 0x391505, 0xed9028,
    0xb0673a, 0xdbd2c1, 0xddd6c4, 0xc0b8ab, 0x3c91b6, 0xe6e0d0, 0xa78965, 0xdacebe, 0x2c87b4,
    0xbfbbb2, 0x875522, 0xe39016, 0x8a3703, 0x7f3400, 0xcb890f, 0xd4c8b8, 0x2690c0, 0xe3dacb,
    0xcedad6, 0x2093c2, 0x9e5b14, 0xc2934d, 0x1e7da9, 0x3c88ac, 0x947c64, 0xc56d2e, 0x94581c,
    0x795e2f, 0xbc976b, 0xd7cebd, 0x248ebe, 0xdcd3c4, 0xcea56f, 0xd5ad7a, 0xc48a36, 0xc79651,
    0xd5ccbd, 0xd2cabd, 0x1a5f88, 0x557c9d, 0x15669b, 0xd3c4af, 0xd3c3b3, 0x1c87b5, 0xcda160,
    0xc0995e, 0xc58d43, 0xceb187, 0xc6923e, 0xb68d4f, 0x644830, 0x187db1, 0x0977ac, 0xc5bcad,
    0xd0c4b6, 0xd5cab8, 0xc68e3b, 0xc59d60, 0xc99a56, 0xcca266, 0xc49c61, 0xc6b28f, 0xc28e43,
    0xc49658, 0xa68856, 0xcec4b8, 0x107baf, 0x1783b2, 0xc29246, 0xc7954c, 0xc39b60, 0xcbac80,
    0xcaa570, 0xc4a473, 0x967a48,
  ],
  [
    0xfcba2e, 0xffcc3d, 0xcdab7b, 0xfcfbf6, 0xf1aa36, 0xf0a937, 0xf6b037, 0xf7b934, 0xf5ba30,
    0xf7b72f, 0xf6bd28, 0xf8bf2a, 0xc38266, 0xb66d67, 0xeec49e, 0xb7775b, 0xc99468, 0xf8b42d,
    0xf9bf2f, 0xfac136, 0xf6c82d, 0xf9c62f, 0xc2845b, 0x70352d, 0x7f3d23, 0x8d5548, 0x1e235d,
    0xf8ba2b, 0xf7c42d, 0xf6c32c, 0x9685bb, 0x9e8db7, 0x73361a, 0xb0653b, 0xf58d1c, 0xd0794c,
    0xad6441, 0xf5a11d, 0xf4a01c, 0xf7a51b, 0xfbfffe, 0xa296ba, 0xd4c0bf, 0x865132, 0xaa593e,
    0xb5744a, 0xc58762, 0xa88c98, 0x9c81ac, 0xb894c2, 0xa295c1, 0x344151, 0xb59dad, 0xa48fa0,
    0x745f80, 0x977f97, 0x6a4535, 0xb1a1bb, 0xcebccc, 0xfefff9,
  ],
  [
    0x7da3ca, 0x86aed2, 0x89b0d9, 0x84aed8, 0x86b0da, 0x89b0db, 0x82acd6, 0x80aad2, 0x7fa6cf,
    0x7ca1cb, 0x79a0cb, 0x739ac1, 0x6e91b7, 0x8cb6de, 0x8dbbdd, 0x90bae0, 0x91bbe3, 0x8ebbe2,
    0x8cb9e2, 0x8ab7e0, 0x87b1db, 0x87b4dd, 0x86b1db, 0x83add7, 0x82a9d2, 0x76a2c7, 0x9ac8e9,
    0x9ccbe9, 0x9ac8ea, 0x99c7e9, 0x98c6e7, 0x99c5e8, 0x94c2e6, 0x91c1e7, 0x91bde4, 0x8dbae1,
    0x8bb8df, 0x8cb6dc, 0x85afd7, 0xa5d4f0, 0xa7d6f2, 0xa6d4ee, 0xa2d1ef, 0x9ecdeb, 0x9bccec,
    0x98c6e8, 0x97c5e7, 0x95c1e4, 0x90bee2, 0xb6e0f8, 0xb3e0f7, 0xb5dff7, 0xb7e1f9, 0xb1e1f7,
    0xadddf3, 0xacdbf5, 0xa8d7f1, 0xa6d5f1, 0xa1d0ec, 0x9fceec, 0x9bc6e9, 0xbee7fb, 0xc3e9fc,
    0xc4eafd, 0xc0ebfe, 0xbbe8fd, 0xb8e5fa, 0xb7e4f7, 0xb0ddf4, 0xaddaf1, 0xa4d1ee, 0xd1edfb,
    0xd6f1fc, 0xd7f2fd, 0xd4f0fb, 0xd4f0fe, 0xed917a, 0xcdedfc, 0xcbecfb, 0xc8e9f8, 0xc4e5f4,
    0xbfe3f3, 0xb9def0, 0xe9f1f3, 0xe8f1f6, 0xe7f0f5, 0xeaf3f8, 0xe5eef3, 0xe3ecf1, 0xfffcd1,
    0xe1ecf0, 0x434146, 0x8b9298, 0x482d18, 0x3b3632, 0x696b6a, 0x816832, 0x474946, 0x706827,
    0x65512c, 0x111a19, 0x866e56, 0x6a6442, 0xb89261, 0x1f2800, 0x2f190b, 0x252122, 0x453a38,
    0x252527, 0x969696, 0x4b6870, 0xaac0cb, 0x161a26, 0x9eb0b0, 0x8a6344, 0xaf735b, 0x41392c,
    0x462d29, 0x3d423c, 0x525659, 0x484c55, 0xfff5cf, 0x95acbe, 0x91aabe, 0x95abb8, 0x94aec7,
    0x7395b1, 0x7b5141, 0xa7bbc6, 0x8ea9be, 0x98aebc, 0x5d3c37, 0x97abb4, 0x998d7f, 0x6f6a30,
    0x776453, 0x7892ad, 0x587796, 0x4b6888, 0x5c7999, 0x8b869a, 0x6e8ca4, 0x647f9a, 0x6c889e,
    0x4e6c88, 0x516a88, 0x4f6781, 0x644f34, 0x96886e, 0x796c5c, 0x445c78, 0x4b657c, 0x435d76,
    0x425a76, 0x3e5670, 0x374f69, 0x385068, 0x3c566f, 0x405870, 0x506880, 0x30300e, 0x4d4a1d,
    0x5d5349, 0x766958, 0x2c4156, 0x2c4154, 0x33485d, 0x2c3e56, 0x2c3e52, 0x25374d, 0x27394d,
    0x2c4058, 0x2d3d57, 0x4d4520, 0x6b673a, 0x212405, 0x7e7053, 0x7f735b, 0x26384c, 0x253447,
    0x233245, 0x243547, 0x273649, 0x1b2838, 0x1b2735, 0x1c2b3e, 0x242611, 0x373f1a, 0x545335,
    0x766a5a, 0x695d4d, 0x22333b, 0x1d2a3a, 0x1c2834, 0x17252e, 0x162635, 0x162636, 0x192636,
    0x3d3713, 0x565709, 0x767e43, 0x241905, 0x5d4e3b, 0x716555, 0x18262f, 0x1b232e, 0x0e1f27,
    0x121f28, 0x14212a, 0x13212a, 0x152330,
  ],
  [
    0xa2d6ec, 0xa1d5ed, 0xa5d4ee, 0xd2e1e4, 0xdce8e6, 0x798885, 0x050706, 0x090909, 0x060606,
    0x080808, 0x090506, 0x0b0203, 0x1a0c0c, 0x110505, 0x090504, 0x070506, 0x040404, 0xa0d2e9,
    0xa3d2e4, 0xd8e2e1, 0x707b75, 0x070908, 0x050505, 0x030303, 0x060503, 0x1a0607, 0x210104,
    0x130505, 0x0b0706, 0x060405, 0x040605, 0xc2d2d1, 0x81928c, 0x0a0a0a, 0x070707, 0x170406,
    0x310a0d, 0x0c0304, 0x050304, 0x0f1515, 0x0d0d0d, 0x020202, 0x090401, 0x070304, 0x110303,
    0x3c0407, 0x040402, 0x130e0a, 0x030301, 0x000000, 0x0c0b07, 0x030502, 0x000200, 0x050503,
    0xae1319, 0x080c0b, 0x820509, 0x2c302f, 0x231f1e, 0x080405, 0x130707, 0x101a19, 0x1c0205,
    0x272926, 0xc2000c, 0x040500, 0x17080b, 0x1d0a0c, 0x14080a, 0xf50c22, 0x52050b, 0xed081c,
    0x0a0605, 0x31070b, 0xbc0517, 0x0b090a, 0x2a2c2b, 0x090b0a, 0x080a09, 0x101211, 0x0a0102,
    0x1c1012, 0x25251d, 0x0b0505, 0x110d0a, 0x161213, 0x483f40, 0x2b3335, 0x192324, 0x313b3c,
    0x2b3536, 0x1f2427, 0x192221, 0x111717, 0x0a0907, 0x120809, 0x080204, 0x491112, 0x1c1c1c,
    0x1c201f, 0x2d3635, 0x424a4c, 0x919f9f, 0xc3c8c4, 0xbbc1bf, 0xaab3b2, 0x020403, 0x0e130f,
    0x171d1d, 0x151e1b, 0x182221, 0x1a2322, 0x151d1f, 0x1c1714, 0x0c0a0b, 0x151a16, 0x10120f,
    0x3e4d4a, 0x283233, 0x374142, 0x384140, 0x333c3b, 0x2d3b3b, 0x2d3937, 0x162222, 0x010101,
    0x111a19, 0x121e1c,
  ],
  [
    0xa4d5eb, 0x7db3c6, 0xa0cee4, 0x9acde3, 0xa9d9f1, 0x9dd1e7, 0xade0f6, 0x95c7dc, 0x8dc2d7,
    0xb5e2f6, 0xb2ddf2, 0xafe0ef, 0xb6dae8, 0xbce0ec, 0xaad1dd, 0xc5dde3, 0xbad4da, 0xcae1e7,
    0xcad7d5, 0xcce1db, 0xd3dee0, 0xd5e0de, 0xd9e5e4, 0xd2dcda, 0xe1ebe9, 0xe5f2ec, 0xe5eef0,
    0xc6d1cd, 0xc3cac8, 0xc2ced0, 0xbbc6c4, 0xb9c1bd, 0xabb6b3, 0xb4bab8, 0xa8b1ad, 0xa4aba8,
    0xa4aeb1, 0x9ba6a3, 0x97a19d, 0x939b98, 0x8a9694, 0x86918d, 0x848e90, 0x7d918b, 0x8da19b,
    0x798684, 0x828c89, 0x76817d, 0x727b79, 0x697675, 0x66726c, 0x626b69, 0x596665, 0x56625c,
    0x525d60, 0x495352, 0x394545, 0x36413d, 0x343e40, 0x293130, 0x1b2424, 0x18201e, 0x171e20,
    0x070605, 0x88bace, 0x7aadc1, 0x5d7272, 0x636e70, 0x737e80, 0x6d817b, 0xd3ebf1, 0xe9f6f2,
    0x9db0aa, 0x929ca1, 0x7d9291, 0x5d716b, 0xa5cddb, 0xc5e6f3, 0xadc0ba, 0xddf1e8, 0xbdd1ca,
    0x2a0a0b, 0xb0bcc2, 0x6d8282, 0x4c6363, 0x5d6c70, 0xc8f3fc, 0x8ca3a3, 0xb7ced3, 0xacc4c4,
    0xd6f4f4, 0x9cd0dc, 0x85b3ba, 0x75a7b1, 0x6b9aa5, 0x56888b, 0x5d94a3, 0x8cc1cc, 0x84acb6,
    0x679598, 0x63928d, 0x477777, 0x30635e, 0x386a6a, 0x50817d, 0x42726d, 0x70a39b, 0x96c4cb,
    0x4c7a83, 0x658a92, 0x99c2ba, 0x8ca28f, 0xadc0ad, 0x3f7381, 0x335863, 0x194952, 0x1a3442,
    0x7d907d, 0x9ab4b4, 0x2e1e20, 0x4d090d, 0xbde1d7, 0x2a241a, 0x9ba9b2, 0x7a8992, 0x4b1d22,
    0x6e070e, 0x701a22, 0x8f060f, 0x911a23, 0xb01823, 0xaf0912, 0xcd0614, 0x6c241b, 0xd01324,
    0xec081b, 0xf60e26, 0xb22a2d, 0xfd3345, 0xfb4c4c, 0xf7714d, 0xeb6a38, 0xf04e34, 0xf82936,
    0xfc5663, 0xff7180, 0xf8926b, 0xf49984, 0xcc261a, 0xfad18d, 0xfbe898, 0xf3c679, 0xf6af70,
    0xeda55a, 0xb74a13, 0xf5b186, 0xfefab1, 0xf97368, 0xe9d4af, 0xdde290, 0xd44f2b, 0xe62d1b,
    0xb3221a, 0xcf4919, 0xd1aa72, 0xe34c1b, 0xd2a559, 0x8d221c, 0xf28c54, 0xd26c32, 0xd4c679,
    0xb67031, 0x4a312e, 0x91292c, 0xd1704f, 0xfefdcf, 0xb9a756, 0xe9853d, 0xce873b, 0xd0914e,
    0xb88738, 0xce2b2c, 0xd3c892, 0xb1a27c, 0xae4837, 0xfdfee8, 0xb6a78e, 0xc6701d, 0xab8658,
    0xe7601c, 0x6e2b2b, 0xe3bbad, 0x504636, 0x482c1b, 0x685849, 0x4f441c, 0x675339, 0x72633b,
    0x746851, 0x887456, 0x92825b, 0x8b7967, 0x797466, 0x96876d, 0xa89375, 0x4c3d41, 0x86663b,
    0x776b63, 0x8b564a, 0xe3d7c3, 0xf8fdf4, 0xd1c5b0, 0xcbb6a5, 0xc6ac97, 0xae9986, 0x715b62,
    0x6e4719, 0x855b63, 0xcb9575, 0x683c43, 0x977c83, 0x9a9485, 0x998b83, 0x9ca076, 0x7b8055,
    0xa97968, 0x98a28c, 0x77826b, 0xbaaba1, 0xb7b4a8, 0xb79ca0, 0xc49d8d, 0xa67e83, 0xcc9ba1,
    0x796a71, 0xa77157, 0x64826a, 0x9b8091, 0xd3cac5, 0x933a42, 0xb33943, 0xb04849, 0xcb494a,
    0xcd3a42, 0x8b4e39, 0xd07366, 0xdd5762, 0xd0d4ce, 0xdcf0de, 0xaed0c2, 0x4a6773, 0xb4c3ac,
    0xbfd3ba, 0xcbe1cb, 0xd5e3cd,
  ],
  [
    0x2f302b, 0x2e2e2c, 0x2f312c, 0x2d322e, 0x2d2f2a, 0x080904, 0x0f100a, 0x0c0d07, 0x0a0a08,
    0x242223, 0x22211f, 0x1f201b, 0x20201e, 0x2b2b29, 0x323431, 0x343631, 0x373934, 0x373c38,
    0x373936, 0x15180d, 0x31322c, 0x060702, 0x25251d, 0x060604, 0x070803, 0x050505, 0x050503,
    0x171715, 0x343a38, 0x414340, 0x454744, 0x434746, 0x444847, 0x12150e, 0x2c2c2a, 0x22231b,
    0x070705, 0x080806, 0x0a0b06, 0x0f110c, 0x131716, 0x384042, 0x494b4a, 0x4f5052, 0x525355,
    0x484a49, 0x141613, 0x0e0e0e, 0x131812, 0xe0c3bf, 0xfadedb, 0xe6cbc2, 0x12140f, 0x040605,
    0x060606, 0x333b3e, 0x4e5251, 0x57585a, 0x54585b, 0x111310, 0x1d1e20, 0x1e201b, 0x806d66,
    0xf7d1ce, 0xf9e7e5, 0xeac4c3, 0x95897b, 0x070904, 0x252726, 0x444851, 0x54555a, 0x54575c,
    0x5a5d62, 0x090909, 0x0d0f0e, 0x252722, 0xecc2c3, 0x533432, 0xd2afad, 0xaf8883, 0x5c5950,
    0x47443b, 0x0f140e, 0x414852, 0x575a5f, 0x0b0d0a, 0x0d120e, 0x9d7667, 0xdab2b2, 0xe0b4b5,
    0xba8e8d, 0x1a0d07, 0x3f4038, 0x32332b, 0x0d120c, 0x52555c, 0x575a61, 0x5a5d64, 0x5b5e65,
    0x040500, 0x3c2716, 0x83544a, 0x66342d, 0xac6963, 0x3d3532, 0x4e4a41, 0x1e211a, 0x0e1108,
    0x51545b, 0x54575e, 0x5c5f68, 0x505656, 0x151a16, 0x2c3925, 0x5d3e3c, 0xc39989, 0x7c5e46,
    0x482d1c, 0x000000, 0x020200, 0x0b0b09, 0x4e515a, 0x52565f, 0x707459, 0x322c1e, 0x575a3d,
    0x705252, 0x100806, 0x010100, 0x0d0f0a, 0x11110f, 0x16180d, 0x010101, 0x12171a, 0x0b0c0e,
    0x070906, 0x171717, 0x6a6e53, 0x070908, 0x030301, 0x1f271a, 0x121b08, 0x7d8361, 0x0a0c09,
    0x1d2122, 0x070707, 0x676c4e, 0x23301f, 0x545943, 0x0e100f, 0x040807, 0x2b2a18, 0x636a4b,
    0x3a4e35, 0x030303, 0x343724, 0x485039, 0x595e40, 0x172214, 0x4e5438, 0x54583d, 0x1f2d1c,
    0x4d4133, 0x545438, 0x525635, 0x848768, 0x8b916f, 0x29251c, 0x44472c, 0x424532, 0x141e13,
    0x0b0d08, 0x1a2515, 0x5b5e43, 0x111619, 0x0f120b, 0x515439, 0x090b0a, 0x384a32, 0x777a5b,
    0x554c3b, 0x3b372c, 0x040700, 0x17140b, 0x42462d, 0x3c4025, 0x202d1c, 0x1d281a, 0x1a2517,
    0x1f220d, 0x010400, 0x5b6145, 0x222f1b, 0x31432d, 0x494b35, 0x12130d, 0x10180b, 0x494d34,
    0x4e5237, 0x091009, 0x060a09, 0x0b0e07, 0x10170f, 0x0a0c07, 0x0c0c04, 0x2e2b1c, 0x89896f,
    0x0b0c06, 0x15170c, 0x1b190d, 0x1f1c15, 0x0c0e09, 0x3f432a, 0x151811, 0x0d0d03, 0x100f0a,
    0x10110b, 0x434739, 0x0c0e0d, 0x788260, 0x6d7550, 0x10130c, 0x383927, 0x0a0c0b, 0x0e0f09,
    0x0f0c05, 0x191b10, 0x292b1e, 0x353b2d, 0x292e1a, 0x858b6f, 0x262d1d, 0x11140d, 0x10150e,
    0x212214, 0x202217, 0x788281, 0x1c1a0b, 0x121608,
  ],
  [
    0x405f50, 0x455957, 0x4c6659, 0x576e64, 0x4d6952, 0x587154, 0x3c4739, 0x6a7d5d, 0x798861,
    0x5e7652, 0x4d5d43, 0x5d6c4f, 0x7a8251, 0x6a724b, 0xa3995c, 0x91916b, 0xad9772, 0x969660,
    0x979f7a, 0x424f3e, 0x2f2c27, 0x6b785c, 0x5a6749, 0x5f7455, 0x576e54, 0x526247, 0x545847,
    0x768451, 0x667647, 0x606f46, 0x596247, 0x889061, 0x636e50, 0x9a9261, 0x8e8a5a, 0xbb9d5f,
    0xaa895c, 0x8e7441, 0x586553, 0x6b7a59, 0x5b5652, 0x515240, 0x555c4c, 0x413e35, 0x69764b,
    0x5b6c40, 0x727f51, 0x767c4e, 0x878d51, 0x6d713e, 0x6b7249, 0x86854d, 0x77784e, 0xa58f44,
    0x998550, 0xa9864e, 0xbc9457, 0x5c644c, 0x606f5a, 0x6f695d, 0x7f8b65, 0x61644f, 0x3c292b,
    0x68723e, 0x7d8450, 0x788250, 0x757849, 0x736244, 0x968c51, 0x927e41, 0x7d7245, 0x8a7035,
    0x9e884c, 0xa7884f, 0xbc915c, 0xaa854e, 0x838860, 0x727f63, 0x726151, 0x5b4b4b, 0x6e6e48,
    0x848856, 0x6f754f, 0x7c6843, 0x8d7c51, 0x7c7048, 0x97834e, 0x76593b, 0xa79354, 0xb08f48,
    0xaa8c50, 0x9b7c46, 0xa6864d, 0xa5884e, 0xc18f46, 0x76624a, 0x6b574c, 0x402d2f, 0x694d41,
    0x868a58, 0x593d3a, 0x6a5746, 0x947c60, 0x88693a, 0xa49254, 0x725930, 0xad9147, 0xa88948,
    0xb39346, 0xb69045, 0xbf9a53, 0x9d6c44, 0xc79943, 0xb98a44, 0xafa26d, 0xa07a67, 0x796a4d,
    0x6c5d48, 0x8a7a56, 0x7d6247, 0x806846, 0x815042, 0xa98a51, 0xa2843e, 0xa88e41, 0xa58e48,
    0xd1a55a, 0xae8241, 0xcea052, 0xb87b42, 0xdcaf5e, 0xaa792c, 0xb26f3b, 0x865340, 0x90604c,
    0x895750, 0x6a4443, 0x844847, 0x7c573c, 0x6d4136, 0xa2614d, 0x915d45, 0xd2a152, 0xc5964e,
    0xc2904b, 0xcf9253, 0xd59d48, 0xc28745, 0xd89d4d, 0xb36b3b, 0xce8f48, 0xb17b3b, 0xa24854,
    0xad635a, 0xac665a, 0x843a37, 0x873f40, 0xa55743, 0xcd9256, 0xb6814d, 0xb47355, 0xa94d42,
    0xb5633d, 0xca8a4a, 0xca8f41, 0xc36f40, 0xd18b43, 0xbe7d3b, 0xe3a957, 0xce984e, 0xb67231,
    0xb86a5e, 0xa33d4a, 0xc86873, 0xaa5248, 0xb1524e, 0xc86949, 0xc76653, 0xc56849, 0xca7d45,
    0xd1725c, 0xd48157, 0xc8734a, 0xc0753e, 0xde9b54, 0xc67641, 0xe5a55b, 0xdda654, 0xe3a655,
    0xe3a55a, 0x883a48, 0xb35458, 0xb47459, 0xb95553, 0xb85047, 0xd78560, 0xd17a5e, 0xd86b64,
    0xd7845a, 0xecaf76, 0xcd655c, 0xc96c4d, 0xd5924b, 0xd08e51, 0xe0a060, 0xcf8653, 0xdb9358,
    0xe0a267, 0xcd894a, 0x9e4f55, 0x9e4f52, 0xb75661, 0xa03f46, 0xa64648, 0xe18671, 0xd27a64,
    0xc06958, 0xeb9280, 0xe3a87e, 0xf4be8f, 0xe18578, 0xd37d62, 0xc36a4a, 0xc77756, 0xcb8552,
    0xc28044, 0xedb584, 0xf9cdb0, 0xa74254, 0xa3455d, 0xc46271, 0x9f3b57, 0x94354d, 0xab504d,
    0xcd7d7c, 0xcb6f70, 0xe6a28d, 0xd59991, 0xf6ada4, 0xdd978f, 0xe49a97, 0xe4938f, 0xc46b71,
    0xdc8675, 0xda8d5f, 0xc87563, 0xd17c68, 0xcbbde0, 0x71283b, 0x7a2141, 0x892549, 0x98304b,
    0xa63d4c, 0xa84057, 0xc66681, 0xe18f9d, 0xd38698, 0xdc92a3, 0xcd889b, 0xaf7e94, 0xc47f94,
    0xc57290, 0xc56c80, 0xc8706f, 0xba7053, 0xa94640,
  ],
  [
    0x5c7f9d, 0x597b97, 0x557790, 0x4f718c, 0x486a83, 0x46647c, 0x405e78, 0x354f70, 0x76705a,
    0xc3c4c6, 0x3b3f3e, 0x434949, 0x3e4746, 0x454a44, 0x6589a9, 0x6887a6, 0x5f84a1, 0x597b96,
    0x53728e, 0x4e6f8e, 0x436483, 0x3c5d7c, 0xbdb9ad, 0xc4c8c7, 0x404443, 0x484c4f, 0x484c4d,
    0x4c4d47, 0x7196b3, 0x6d90ae, 0x688aa6, 0x5b7e9e, 0x5b7f97, 0x4c6f8f, 0x4a6b8a, 0x446584,
    0xfffffd, 0x75acb1, 0x444547, 0x444847, 0x4c4e4b, 0x4a4b46, 0x7ea0bc, 0x7699b5, 0x6f91ad,
    0x6b8da9, 0x6689a7, 0x557a95, 0x4b6e8c, 0xdcdbd7, 0xcacac8, 0x444849, 0x4b4c4e, 0x474f51,
    0x4c4c4c, 0x8fa9c0, 0x88a6c0, 0x8da9bf, 0xe1e1df, 0x6b8eac, 0x6486a2, 0x716d61, 0x573e42,
    0xc8cdc7, 0x434748, 0x494d4e, 0x95b0c5, 0x91abc2, 0x8cabc0, 0x8aa9be, 0xdbe0e3, 0x6d8fa8,
    0x6689a5, 0xceccbf, 0x402e2a, 0xdadbd6, 0x424647, 0x494d50, 0x464f4e, 0x494a4c, 0xa3bdca,
    0x9eb8c5, 0xa5a196, 0x97b1c2, 0x85a1b7, 0x7b9aaf, 0x00060d, 0xd4d7d0, 0xcacecd, 0x45494c,
    0x41494b, 0x494c53, 0x20364e, 0xc5d0d6, 0xf6f8f5, 0x050500, 0xd4d8d9, 0xa4b6c4, 0x9ab0be,
    0x0d141e, 0x604c45, 0xdfdeda, 0x45484d, 0x464e51, 0x434a52, 0x162538, 0xa3adb6, 0xd7d6d2,
    0x1d1f11, 0x80919b, 0x8e979e, 0x060407, 0xc4c1bc, 0xd8d9d4, 0x484b50, 0x474f52, 0x454e53,
    0x0e140a, 0x030802, 0x000501, 0x1a1a10, 0x000000, 0x1e141c, 0x3a6286, 0xafb0ab, 0xb3b2ae,
    0xc3c3bb, 0x44474c, 0x485053, 0x444c4f, 0x464d55, 0x718387, 0x101d25, 0x8d9aa2, 0x0f140e,
    0x061019, 0x666a6b, 0xb6bab9, 0x7d9e89, 0x7b8c96, 0xcdccc7, 0x373735, 0x393d3e, 0x4b4f50,
    0x0d0e09, 0x1e2c35, 0x88909b, 0x12200f, 0x182430, 0xa7aca8, 0xc7c6c1, 0x589b7c, 0x353c44,
    0x4d5154, 0x525659, 0x4b5356, 0x494f4f, 0x34404c, 0x495762, 0x8d9484, 0x3f6848, 0x091217,
    0x7f8a79, 0xa6aca2, 0xe2e3dd, 0x70a88d, 0x31393c, 0x4e555b, 0x4f565e, 0x454f51, 0x15160e,
    0x45515f, 0x3d484e, 0x908d7c, 0x8b8e93, 0x62716e, 0xaaafa9, 0xc1c2bc, 0x79ab90, 0x353f48,
    0x444b51, 0x4a5159, 0x4d545c, 0x414850, 0x1c2220, 0x262b2e, 0x6b737e, 0xb6aea1, 0xb9bab5,
    0x9ea39f, 0xabada2, 0xb9bab2, 0xdadad2, 0x363f44, 0x454c54, 0x465052, 0x454e55, 0x3a4149,
    0x1e2722, 0x344040, 0x2b3431, 0x8e8b82, 0x939a8a, 0xb1b2aa, 0xb4b5af, 0xb2b5ac, 0xdcdcd4,
    0x3d4548, 0x424a4d, 0x434a54, 0x323b44, 0x637579, 0x142127, 0x1e1f1a, 0x020605, 0x5f675a,
    0xb0b1ac, 0xafb0a8, 0xd8d5cc, 0x3a4245, 0x434c53, 0x3b4248, 0x292e31, 0x1f2827, 0x171e17,
    0x171813, 0x6e7273, 0x88837d, 0x525c5b, 0xa0a19c, 0xa9aaa5, 0xa9ab9e, 0xbfc0b2, 0x3a4342,
    0x3f494b, 0x495251, 0x1a2225, 0x121818, 0x171b1a, 0x12130e, 0xadaea9, 0xacaba7, 0x505558,
    0xa1a6a0, 0xa5a6a1, 0xa4a59f, 0xb3b5aa, 0x3e4442, 0x383c3d, 0x3a4040, 0x212723, 0x233036,
  ],
  [
    0x2e3b2a, 0x3a4131, 0x718995, 0xaabbcf, 0x5d5e59, 0x878a81, 0xb5bec5, 0xedf4fa, 0xe9f0f6,
    0xc8d8e8, 0xb8cce5, 0xb0c8e0, 0x6b7c86, 0x36382d, 0xabc4da, 0x4f594e, 0x364037, 0x585b48,
    0x828f86, 0xc6d8f0, 0x908b87, 0x96939a, 0x8f8f91, 0x858e8d, 0x85888d, 0x808485, 0x8a8b8d,
    0x68615b, 0x313d31, 0x404234, 0x445243, 0xa0b0ad, 0x8a9680, 0xadc3d1, 0xcadcf2, 0xc5daed,
    0xbdd5ed, 0xbed2eb, 0xdde7f1, 0xdce5ee, 0x9ba8ae, 0x37392e, 0x2f3a34, 0x2e3525, 0x5b6d57,
    0x606851, 0x373e2e, 0xbfc4be, 0xfefffa, 0x5b6a3f, 0xf7fbfe, 0xe9f0f8, 0xe4ebf5, 0x4c4d45,
    0x525a5d, 0x57584a, 0x343724, 0xfefff9, 0xacb0b3, 0x2f352b, 0x3c442f, 0x494e30, 0xfafef0,
    0x4f622b, 0xf7fbfc, 0x46612c, 0xe9ecf1, 0x3b3e2b, 0x7a7b7f, 0x5a4e3e, 0x3d4837, 0x343f31,
    0x425b24, 0x374722, 0x35521c, 0xc99c05, 0xffc715, 0xe2ae00, 0xba9506, 0x293821, 0x2a3d1f,
    0x3e5c16, 0x39590e, 0x1a2016, 0x3c4532, 0x2a3227, 0x2a3429, 0x293020, 0x9d7c09, 0xa0650b,
    0x482e15, 0x54330a, 0xf3ce1b, 0x343d38, 0x21240f, 0x2d3f19, 0x9e9e96, 0x171611, 0x444a40,
    0x2c2c22, 0x161b15, 0x282f1f, 0x505721, 0x886f0b, 0x472d08, 0x75580a, 0x1c1c12, 0x47640a,
    0x374828, 0x97978f, 0x090e08, 0xa79d91, 0xaba398, 0x5a6324, 0x0a0f09, 0x12130b, 0x5f5522,
    0x394a1d, 0x86700d, 0x9a7c24, 0x2b331b, 0x384623, 0x9a8009, 0x909088, 0x414220, 0x938675,
    0x202529, 0x0e0f0a, 0xb8aa2f, 0xcfc349, 0x3e3f2d, 0x13200c, 0xdfddc6, 0x060200, 0x1a1710,
    0x171810, 0x272c0c, 0x7f7c75, 0x4e4323, 0x1c232b, 0xafa59b, 0xd6d5b9, 0x97a341, 0x8a9e18,
    0xaaa877, 0x273015, 0x232d22, 0x293d1a, 0x1d1f14, 0x1a1a12, 0x181713, 0x151611, 0x2c2a1d,
    0x4d565d, 0xaea5a0, 0x13140f, 0x0f0f0d, 0xaeb915, 0xd1cdb4, 0xdad9ba, 0x3e4c2b, 0xc4c3a7,
    0xe5e1c6, 0xc8c5a6, 0x2c2b27, 0x202018, 0x2a2a20, 0xafa8a0, 0x10110c, 0x0b0704, 0x425327,
    0xd6ddb4, 0x161f0a, 0xcbcaae, 0x252213, 0x24321b, 0x223114, 0x262922, 0x2b2e27, 0x171c16,
    0x161712, 0x0c0d08, 0x20371d, 0x947e4d, 0x2b3e1e, 0x4f5a38, 0x2f402e, 0x3b5027, 0x808364,
    0x23291f, 0x253818, 0x948369, 0x24231e, 0x0f140e, 0x181914, 0x959c73, 0x354a1f, 0x071000,
    0x33431c, 0x3e5328, 0x203219, 0x25351b, 0x0f150b, 0x1e1e12, 0x575d17, 0x594e3c, 0x191e18,
    0x435441, 0x3c4b22, 0x49631a, 0x445a2b, 0x5e744e, 0x273a1c, 0x3e5123, 0x12190e, 0x2b381c,
    0x0d1307, 0x091406, 0x11120d, 0x30472a, 0x2b3d25, 0x1d3118, 0x1d2a18, 0x28361f, 0x2c391b,
    0x303f22, 0x655943, 0x282e24, 0x4c5624, 0x8b786a, 0x1c211b, 0x1a1b16, 0xacb075, 0x5c5543,
    0x58584c, 0x3f4d2c, 0x24311d, 0x28311c, 0x232e1d, 0x3a4429, 0xb9ba90, 0x635b48, 0x322515,
    0xc0b099, 0x121816, 0x21221d, 0x24301a, 0x4c4437, 0x141e13, 0x283625, 0x1b2816, 0x212a19,
    0x2f4129, 0x4c4b2f, 0x635c52,
  ],
  [
    0x877865, 0xac9a82, 0xac9c85, 0x9a8a71, 0x242424, 0xafc765, 0x97b446, 0x294b19, 0xeaf4d1,
    0xbed494, 0x86a52d, 0xc2d6a3, 0x3d630e, 0x586a18, 0xc2b09a, 0xb8a68e, 0xa19076, 0xac987f,
    0xa4937f, 0x4e561b, 0x414e23, 0x879f3f, 0x89b03d, 0x588506, 0x193600, 0x305826, 0xe8f1dc,
    0xd7e5c2, 0xb7a58f, 0xab977e, 0x3f3c35, 0xc0af9b, 0x9c8b6f, 0x696250, 0x5b5851, 0x303c28,
    0x3c5a1e, 0x2a5007, 0x2c5008, 0xd7e2c2, 0xc5d3a0, 0xc2d2ab, 0x82a918, 0x38600a, 0x94866c,
    0xa1907c, 0x646545, 0x2e4821, 0x415e26, 0x5a5a4e, 0x2d5111, 0x234512, 0x3c6018, 0xd5e3bf,
    0xa6bc8b, 0x5d7d3a, 0x264b08, 0x25460d, 0x396311, 0x3a4d20, 0x344e27, 0x2c4c1b, 0x365420,
    0x2a4c10, 0x1b4106, 0x193504, 0x3a5c12, 0xb3c39c, 0xedf4e2, 0x1d4310, 0x1c3d06, 0x1b3c03,
    0x467106, 0x518306, 0x98ac4d, 0x28421f, 0x28471b, 0x1d3c10, 0x113100, 0x204407, 0x6e872c,
    0x3a6436, 0x436125, 0x16370c, 0x538419, 0xa5ba43, 0x739d09, 0x5d9005, 0x629103, 0x2b4818,
    0x283e1a, 0x213c19, 0x1e3f06, 0x5c8702, 0xc3d2a7, 0x8db346, 0x153408, 0x214519, 0x96a222,
    0x819e10, 0x739604, 0x2f4d11, 0x61861d, 0xe52a7b, 0xe42e54, 0x8a8412, 0xdfb5cd, 0x2f5107,
    0x6f9212, 0x57780d, 0x436e12, 0x24251f, 0xdce288, 0xa7b347, 0x565f0c, 0x253103, 0x263d07,
    0xbb6886, 0xd32f88, 0x793417, 0xeb1257, 0xcb216a, 0x6d6831, 0x2e4413, 0x1c1c1a, 0x1d2112,
    0x8fa632, 0x42520b, 0xa2ac31, 0x96b416, 0x1c3307, 0xff75b3, 0xfbe5d8, 0xfff3d3, 0xcd0e3a,
    0x333415, 0x402a12, 0x393b36, 0x131311, 0x7f6745, 0x759534, 0x6c9030, 0x688c2a, 0x668a28,
    0x9a173f, 0xb31a50, 0xffffff, 0xa4070e, 0x9a0719, 0xec306d, 0x8b5a39, 0x262520, 0x252821,
    0x26210d, 0x2d2e29, 0xaf9a7f, 0x758020, 0xa2ba5a, 0xb8ca98, 0x94a55f, 0x98163a, 0xae0a22,
    0x3f2315, 0x322417, 0x302f1b, 0x342e0e, 0x474a2f, 0x1c210a, 0x8db217, 0x2b530d, 0x29451c,
    0x26441e, 0x142c0a, 0x9b1748, 0xb91955, 0x695031, 0x231c0c, 0x9e9689, 0x5e5625, 0x434a29,
    0x192413, 0x31550d, 0x244808, 0x1e390c, 0x1c3c0d, 0x264a1c, 0x233213, 0x192d0a, 0x4f3618,
    0x1c3a06, 0x24410b, 0x1b3802, 0x294709, 0x1d360c, 0x424528, 0x2b4b0c, 0x2f571b, 0x31571c,
    0x325c10, 0x709c15, 0x536c19, 0x94683b, 0x649017, 0x4e8607, 0x163605, 0x203a0a, 0x62890c,
    0x5f8806, 0x163202, 0x5d891a, 0x426813, 0x76a022, 0x213c09, 0x2d471a, 0x1f380e, 0xef9d6d,
    0x569006, 0x4b8304, 0x264212, 0x1c4100, 0x588107, 0x4c7701, 0x142805, 0x244111, 0x1f3a0d,
    0x2b4019, 0x2a4717, 0x213b0e, 0x2a3814, 0xb26948, 0x609200, 0x518405, 0x142f02, 0x234206,
    0x647e13, 0x476600, 0x6d8e1d, 0x183308, 0x27431a, 0x244010, 0x253e14, 0x23231b, 0x699d0a,
    0x568f0a, 0x173404, 0x1f3e05, 0x699228, 0x406305, 0x29461a, 0x214215, 0x254715, 0x1f3a0f,
    0x294514, 0x232824, 0x2e332d, 0x5b9201, 0x549110, 0x0f2c00, 0x163a00, 0x1c4000, 0x2d5800,
    0x3a5c06,
  ],
  [
    0x3a242b, 0x3b2426, 0x352325, 0x836454, 0x7d5533, 0x8b7352, 0xb1a181, 0xa4632e, 0xbb6b33,
    0xb47249, 0xca7239, 0xd29057, 0xe0b87e, 0xd9b166, 0xf5eabe, 0xfcfadf, 0xd9d1b0, 0xfcfadf,
    0xd1d1ca, 0xa7b1ac, 0x879a8c, 0x9186ad, 0x776a8e, 0x000022, 0x000022, 0x000022, 0x000022,
    0x000022, 0x000022, 0x000022, 0x000022, 0x000022, 0x000022,
  ],
  [
    0x4a3c21, 0xaf936c, 0x9a7a51, 0x967e5c, 0x322514, 0x050400, 0x0f0c07, 0x151509, 0x584234,
    0x9f856e, 0xf5efe1, 0xb08c52, 0x222222, 0x9f8869, 0xc6a77f, 0x94794f, 0xa07e58, 0x7f6544,
    0x503e28, 0x0a0b06, 0x10100a, 0x44392c, 0x7f6554, 0xb19878, 0x765431, 0xa6a08a, 0xc4ab8f,
    0x836544, 0xa99077, 0x93724d, 0x8f6c41, 0x090a05, 0x100f0b, 0x483628, 0xd8c2ab, 0xb39e84,
    0xfbfcf6, 0x8f826f, 0xcba67a, 0xb69165, 0xbea788, 0xa98d75, 0x795a41, 0x291f15, 0x0d0e09,
    0x614b3d, 0xddc9af, 0x5b452d, 0xc6a174, 0xab8966, 0x59432e, 0x6a6561, 0xa28053, 0x8b714b,
    0x68594b, 0x5c391f, 0x2e2421, 0x93735f, 0xa28972, 0x4f3a22, 0x302313, 0x816c4b, 0x916a46,
    0x797370, 0xfdf6f4, 0x9c8166, 0x94a6b5, 0xc1a17b, 0x4e3731, 0xfefefc, 0x564338, 0x382c20,
    0x7b6139, 0x936d41, 0x83603a, 0x384446, 0xe1bd94, 0x524132, 0x716a73, 0xd4c6b9, 0x604938,
    0xb59b83, 0x7d624c, 0xcfb084, 0xb28a5f, 0x885e37, 0x8b6641, 0x20383c, 0x0e0f12, 0x1e1f23,
    0x1c1714, 0x291d20, 0x32271e, 0x18191d, 0x40322d, 0xa68759, 0x886a43, 0xa17348, 0xdec3b8,
    0xb1becd, 0x837776, 0xe5dbe2, 0x655447, 0x7f6d61, 0x494545, 0x11151d, 0x070c12, 0x855634,
    0x0b0800, 0x6c5a4e, 0x938176, 0x847368, 0x8c7c6f, 0x89786e, 0x938279, 0x8b796d, 0x5d5052,
    0x1a203a, 0x262431, 0x9b897d, 0x908179, 0x8e847b, 0x988f86, 0x9a8d85, 0x988b83, 0x94867b,
    0x95877c, 0x8d766c, 0x6f5b58, 0x75726b, 0xab9e96, 0xa79c96, 0x9e948b, 0x8b7d74, 0x93837b,
    0x95877e, 0xa3968f, 0x958784, 0xa39894, 0xa19795, 0x817677, 0x9a8f89, 0x988f88, 0xa7988f,
    0x83685b, 0x897a73, 0x91827b, 0x9b8e86, 0x9c8e83, 0x8a817a, 0xc3b9b0, 0x7c736e, 0x918983,
    0x9d948f, 0x9f948e, 0xa99e9a, 0x9b8e87, 0x96887c, 0x92827a, 0x968780, 0x9e9188, 0x94877f,
    0xb1a8a3, 0x8a7d74, 0x99918f, 0xa29995, 0xa39990, 0x988e85, 0xa2958d, 0x7a7267, 0x877970,
    0x93857d, 0x7d6e5c, 0x6c5e52, 0xa2968f, 0x9e9088, 0x998f8b, 0xa1948c, 0xa1958e, 0xa29791,
    0x9e9087, 0x80766d, 0x7d6e68, 0x8d7f76, 0x43362b, 0x968881, 0x8a7d70, 0x7b6e65, 0xa4978f,
    0xa1978e, 0x9c9489, 0x8c817b, 0x938a81,
  ],
  [
    0x728184, 0x6e8280, 0x697c78, 0x6b7a75, 0x4d4d4d, 0x2b3a23, 0x375032, 0x4b6b3c, 0xfeffff,
    0x9ac963, 0x607274, 0x5e716d, 0x5b6b68, 0x525b5a, 0xfdfcff, 0x2a3924, 0x619763, 0x495d41,
    0xadc0aa, 0xfefffb, 0x51605d, 0x495757, 0x464f4e, 0x663934, 0xede3eb, 0x21321f, 0x385129,
    0x3d553b, 0xfefff9, 0xffffff, 0x505149, 0x4c514a, 0xf6ead4, 0x54281f, 0xfffafe, 0x676067,
    0x7b946a, 0xf2fdef, 0x969ea9, 0x60606a, 0x050505, 0x18181a, 0x221715, 0x241f26, 0x5b565c,
    0x1f1925, 0x453a4b, 0x5c7e27, 0x6e7776, 0x818d8d, 0x020202, 0x28201e, 0x1f1a16, 0x09070c,
    0x241417, 0xad9f9f, 0x493842, 0x5e7318, 0x868d93, 0x77848a, 0x010103, 0x2e2623, 0x130908,
    0x190b0a, 0x8e6f6a, 0xba988f, 0x25161d, 0x584558, 0xbcc5ce, 0xb1bac1, 0x262b2f, 0x6d625c,
    0x8d7b77, 0x886552, 0xd9c4c9, 0xdecbcd, 0xe1d5df, 0x696272, 0x585161, 0xa3a6b5, 0x141318,
    0x7f756c, 0x342625, 0x9f7c68, 0xb39b99, 0x6e5958, 0xc0bfc5, 0x7d6e67, 0xe1d3c8, 0x6c6167,
    0x1f1c23, 0x0f0b0c, 0x565251, 0x514b4b, 0x504144, 0xe6ddd4, 0xe8e3dd, 0xc2bab7, 0x3f3a3e,
    0x262128, 0x3c373b, 0x4f4f4d, 0x271e17, 0xcec2b4, 0xefebe0, 0xfefefe, 0xf7f1e3, 0x676056,
    0xbbb1a5, 0x4e4b56, 0x59535d, 0x332f2e, 0x646a60, 0xfffffd, 0xf7f7ef, 0xb8b3b0, 0x61594c,
    0x8c887d, 0xe7e2e6, 0x343740, 0x313139, 0x54504d, 0x646560, 0xdad1d2, 0x8e8a87, 0xadadad,
    0x909193, 0xf0ebef, 0xdcdbd9,
  ],
];

/**
 * Constrains a color component value to single-byte range (`0`-`255`).
 * @param c A color component value.
 * @returns The input value constrained into single-byte range.
 * @group Graphics
 */
export const safeRGBComponent = (c: number) => {
  if (c < 0) {
    c = 0;
  }
  if (255 < c) {
    c = 255;
  }
  return Math.trunc(c);
};

/**
 * Constructs a 32bit integer value that represents an RGBA color value.
 * @param r The R component.
 * @param g The G component.
 * @param b The B component.
 * @param a The A component.
 * @returns The constructed color value.
 * @group Graphics
 */
export const fromRGBA = (r: number, g: number, b: number, a: number) => {
  r = safeRGBComponent(r);
  g = safeRGBComponent(g);
  b = safeRGBComponent(b);
  a = safeRGBComponent(a);

  return (r << 24) | (g << 16) | (b << 8) | a;
};

/**
 * Constructs a 32bit integer value that represents an RGBA color value.
 * The A component is fixed to `255`
 * @param r The R component.
 * @param g The G component.
 * @param b The B component.
 * @returns The constructed color value.
 * @group Graphics
 */
export const fromRGB = (r: number, g: number, b: number) => {
  return fromRGBA(r, g, b, 255);
};

/**
 * Extracts the R component from a color value.
 * @param color The color value.
 * @returns The R component of the color value.
 * @group Graphics
 */
export const getR = (color: number) => {
  return (color >> 24) & 0xff;
};

/**
 * Extracts the G component from a color value.
 * @param color The color value.
 * @returns The G component of the color value.
 * @group Graphics
 */
export const getG = (color: number) => {
  return (color >> 16) & 0xff;
};

/**
 * Extracts the B component from a color value.
 * @param color The color value.
 * @returns The B component of the color value.
 * @group Graphics
 */
export const getB = (color: number) => {
  return (color >> 8) & 0xff;
};

/**
 * Extracts the A component from a color value.
 * @param color The color value.
 * @returns The A component of the color value.
 * @group Graphics
 */
export const getA = (color: number) => {
  return color & 0xff;
};

/**
 * Returns a new color that is a blend between a source and a destination
 * color linerally. The alpha component in these colors is ignored. Instead, the provided
 * `alpha` value is used to blend between the two colors.
 * @param src The source color.
 * @param dst The destination color.
 * @param alpha The alpha value to use for blending.
 * @returns The blended color.
 * @group Graphics
 */
export const blend = (src: number, dst: number, alpha: number) => {
  if (alpha >= 255) {
    return dst;
  }
  if (alpha <= 0) {
    return src;
  }
  src |= 0;
  dst |= 0;

  return fromRGB(
    (alpha * getR(dst) + (255 - alpha) * getR(src)) >> 8,
    (alpha * getG(dst) + (255 - alpha) * getG(src)) >> 8,
    (alpha * getB(dst) + (255 - alpha) * getB(src)) >> 8,
  );
};

/**
 * Returns a new color that is a blend between a source and a destination
 * color additively. The alpha component in these colors is ignored. Instead, the provided
 * `alpha` value is used to blend between the two colors.
 * @param src The source color.
 * @param dst The destination color.
 * @param alpha The alpha value to use for blending.
 * @returns The blended color.
 * @group Graphics
 */
export const blendAdditive = (src: number, dst: number, alpha: number) => {
  if (alpha >= 255) {
    return dst;
  }
  if (alpha <= 0) {
    return src;
  }

  return fromRGB(
    ((alpha * getR(dst)) >> 8) + getR(src),
    ((alpha * getG(dst)) >> 8) + getG(src),
    ((alpha * getB(dst)) >> 8) + getB(src),
  );
};

/**
 * Returns a new color that is a blend between a source and a destination
 * color subtractively. The alpha component in these colors is ignored. Instead, the provided
 * `alpha` value is used to blend between the two colors.
 * @param src The source color.
 * @param dst The destination color.
 * @param alpha The alpha value to use for blending.
 * @returns The blended color.
 * @group Graphics
 */
export const blendSubtractive = (src: number, dst: number, alpha: number) => {
  if (alpha >= 255) {
    return dst;
  }
  if (alpha <= 0) {
    return src;
  }

  const r = getR(src) - ((alpha * getR(dst)) >> 8);
  const g = getG(src) - ((alpha * getG(dst)) >> 8);
  const b = getB(src) - ((alpha * getB(dst)) >> 8);
  return fromRGB(r < 0 ? 0 : r, g < 0 ? 0 : g, b < 0 ? 0 : b);
};

/**
 * Retrieves a random color from the current global palette.
 * Uses the global {@linkcode random} object.
 * @returns A random color.
 * @group Graphics
 */
export const somecolor = () => {
  // pick some random good color
  const color =
    PALETTES[PALETTE_INDEX][Math.trunc(random.nextFloat() * PALETTES[PALETTE_INDEX].length)];
  return (color << 8) | 0xff;
};

/**
 * Switches the global palette to the next available preset.
 * @group Graphics
 */
export const nextPalette = () => {
  ++PALETTE_INDEX;
  if (PALETTES.length <= PALETTE_INDEX) {
    PALETTE_INDEX = 0;
  }
};

/**
 * Converts a color value to grayscale.
 * @param color The color to convert.
 * @returns The grayscale value appropriate for the color.
 * @group Graphics
 */
export const toGrayScale = (color: number) => {
  const gs = getR(color) * 0.3 + getG(color) * 0.59 + getB(color) * 0.11;
  return fromRGBA(gs, gs, gs, getA(color));
};
