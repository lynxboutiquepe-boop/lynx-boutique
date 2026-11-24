(function registerLynxProductImages() {
    // Galerías oficiales de Fashion Nova para las fichas nuevas de preventa.
    // Estas reemplazan cualquier mockup o foto incompleta de la fila de Supabase.
    const fashionNovaOfficialGalleries = Object.freeze({
        'stacked-slim-flare-we-wildin-in-bling-jean': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/10-10-25_S10_20_HD25B003_LightWash_ZSR_KJ_MC_12-33-26_16612_PXF.jpg?v=1760213698',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/10-10-25_S10_20_HD25B003_LightWash_ZSR_KJ_MC_12-33-26_16609_PXF.jpg?v=1760213698',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/10-10-25_S10_20_HD25B003_LightWash_ZSR_KJ_MC_12-33-26_16620_PXF.jpg?v=1760213698',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/10-10-25_S10_20_HD25B003_LightWash_ZSR_KJ_MC_12-33-26_16618_PXF.jpg?v=1760213698'
        ],
        'ruthless-embroidered-stacked-skinny-cargo-jean-medium-wash': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-03-24_S7_27_BG6_MediumWash_KF_DJ_12-43-24_29635_EH.jpg?v=1704838344',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-03-24_S7_27_BG6_MediumWash_KF_DJ_12-43-24_29632_EH.jpg?v=1704838344',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-03-24_S7_27_BG6_MediumWash_KF_DJ_12-43-24_29660_EH.jpg?v=1704838344',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-03-24_S7_27_BG6_MediumWash_KF_DJ_12-43-24_29666_EH.jpg?v=1704831612'
        ],
        'boxy-soho-weave-applique-textured-button-up-shirt-black': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/09-08-25_S7PM_4_FNMKV54003_Black_CR_DJ_17-49-14_115672_CM.jpg?v=1757557962',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/09-08-25_S7PM_4_FNMKV54003_Black_CR_DJ_17-49-14_115649_CM.jpg?v=1757557962',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/09-08-25_S7PM_4_FNMKV54003_Black_CR_DJ_17-49-14_115667_CM.jpg?v=1757557962',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/09-08-25_S7PM_4_FNMKV54003_Black_CR_DJ_17-49-14_115689_CM.jpg?v=1757557944'
        ],
        'stacked-slim-flare-fray-waves-jeans-black-wash': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/12-24-25_S7_27_25GWNZ360_BlackWash_KP_DJ_09-31-53_13965_PXF.jpg?v=1767111587',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/12-24-25_S7_27_25GWNZ360_BlackWash_KP_DJ_09-31-42_13961_PXF.jpg?v=1767111587',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/12-24-25_S7_27_25GWNZ360_BlackWash_KP_DJ_09-33-33_13974_PXF.jpg?v=1767111587',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/12-24-25_S7_27_25GWNZ360_BlackWash_KP_DJ_09-32-41_13970_PXF.jpg?v=1767111587'
        ],
        'stacked-skinny-flare-walk-me-through-jeweled-distressed-jean-medium-blue-wash': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/11-03-25_S9_19_URSS26P1003_MediumBlueWash_DA_PC_10-20-51_0450_PXF.jpg?v=1762297281',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/11-03-25_S9_19_URSS26P1003_MediumBlueWash_DA_PC_10-20-20_0441_PXF.jpg?v=1762297281',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/11-03-25_S9_19_URSS26P1003_MediumBlueWash_DA_PC_10-22-38_0458_PXF.jpg?v=1762297281',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/11-03-25_S9_19_URSS26P1003_MediumBlueWash_DA_PC_10-23-09_0465_PXF.jpg?v=1762297281'
        ],
        'canyon-wave-johnny-polo-light-blue': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/05-28-26_S8_42_UN4225_LightBlue_ZSR_DA_MC_13-36-36_39105_MWA.jpg?v=1780346082',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/05-28-26_S8_42_UN4225_LightBlue_ZSR_DA_MC_13-36-12_39095_MWA.jpg?v=1780346082',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/05-28-26_S8_42_UN4225_LightBlue_ZSR_DA_MC_13-36-59_39113_MWA.jpg?v=1780346082',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/05-28-26_S8_42_UN4225_LightBlue_ZSR_DA_MC_13-38-06_39119_MWA.jpg?v=1780346082'
        ],
        'desert-hues-crochet-button-up-shirt-brown': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-27-26_S9_87_FNMKV61051_Brown_AF_EO_15-07-48_1110_PXF.jpg?v=1775065009',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-27-26_S9_87_FNMKV61051_Brown_AF_EO_15-07-40_1106_PXF.jpg?v=1775065009',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-27-26_S9_87_FNMKV61051_Brown_AF_EO_15-07-52_1112_PXF.jpg?v=1775065009',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-27-26_S9_87_FNMKV61051_Brown_AF_EO_15-08-07_1117_PXF.jpg?v=1775065009'
        ],
        'desert-hues-crochet-button-up-shirt-cream': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-13-26_S7_37_FNMKV61051_Cream_ZSR_DA_MA_11-43-13_28404_SKS_SKS_CM.jpg?v=1773697865',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-13-26_S7_37_FNMKV61051_Cream_ZSR_DA_MA_11-42-24_28389_SKS_SKS.jpg?v=1773697865',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-13-26_S7_37_FNMKV61051_Cream_ZSR_DA_MA_11-43-24_28412_SKS_SKS.jpg?v=1773697865',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-13-26_S7_37_FNMKV61051_Cream_ZSR_DA_MA_11-43-46_28416_SKS_SKS.jpg?v=1773697865'
        ],
        'relaxed-sunstage-crochet-cuban-collar-button-up-shirt-light-blue': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-10-26_S3_59_UN4231_LightBlue_LR_DJ_14-14-02_56140_PXF.jpg?v=1776188900',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-10-26_S3_59_UN4231_LightBlue_LR_DJ_14-14-02_56126_PXF.jpg?v=1776188900',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-10-26_S3_59_UN4231_LightBlue_LR_DJ_14-14-02_56144_PXF.jpg?v=1776188900',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-01-26_S6_6_UN4231_LightBlue_AB_DJ_17-20-58_PLUS_1573_PXF.jpg?v=1776188900'
        ],
        'nolan-textured-shirt-green': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-05-26_S2_1_ZDF01V410315_Green_ZSR_AB_MA_09-07-26_11963_BH_SKS.jpg?v=1770677511',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-05-26_S2_1_ZDF01V410315_Green_ZSR_AB_MA_09-06-17_11942_BH_SKS.jpg?v=1770677511',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/12-02-25_S7_44_FNMTS61003_Brown_AE_MC_14-09-43_PLUS_26740_SKS.jpg?v=1770677511',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-05-26_S2_1_ZDF01V410315_Green_ZSR_AB_MA_09-07-51_11969_BH_SKS.jpg?v=1770677511'
        ],
        'relaxed-aegean-pleat-cuban-collar-button-up-cream': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-24-26_S8_17_FNMKV61056_Cream_ZSR_DA_MA_11-00-50_1928_BH_SKS.jpg?v=1772133541',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-24-26_S8_17_FNMKV61056_Cream_ZSR_DA_MA_10-59-18_1917_BH_SKS.jpg?v=1772133541',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-24-26_S8_17_FNMKV61056_Cream_ZSR_DA_MA_11-00-59_1934_BH_SKS.jpg?v=1772133535',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-24-26_S8_17_FNMKV61056_Cream_ZSR_DA_MA_11-01-53_1943_BH_SKS_SG.jpg?v=1772133535'
        ],
        'harbor-point-knit-johnny-collar-polo-cream': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-07-26_S7_3_FNMTK61020_Cream_DA_DJ_09-47-54_25114_BG_SKS_922d7fa1-98ee-4e06-ad7c-32609fa7023f.jpg?v=1767985410',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-07-26_S7_3_FNMTK61020_Cream_DA_DJ_09-47-45_25109_BG_SKS_43d30ebe-a3fc-49b8-89d7-bc56cba8baf0.jpg?v=1767985410',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-07-26_S7_3_FNMTK61020_Cream_DA_DJ_09-48-13_25122_BG_SKS_BH.jpg?v=1767993225',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-05-26_S6_PM_8_FNMTK61020_Cream_ZSR_AB_MC_18-12-26_PLUS_11472_PXF.jpg?v=1773081104'
        ],
        'solstice-knit-johnny-collar-polo-burgundy-combo': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/11-25-25_S9_7_FNMTK54012_Burgundycombo_ZSR_LR_DJ_08-09-25_2470_CM.jpg?v=1764177480',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/11-25-25_S9_7_FNMTK54012_Burgundycombo_ZSR_LR_DJ_08-09-25_2466_CM.jpg?v=1764177480',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/11-25-25_S9_7_FNMTK54012_Burgundycombo_ZSR_LR_DJ_08-09-25_2472_CM.jpg?v=1764177480',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/11-24-25_S8_3_FNMTK54012_Burgundycombo_ZSR_KJ_MC_07-47-07_PLUS_7582_PXF.jpg?v=1764177480'
        ],
        'straight-flare-aegean-pant-cream': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-24-26_S8_18_FNMDT61044_Cream_DA_MA_11-03-31_62663_BH_SKS.jpg?v=1772837968',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-24-26_S8_18_FNMDT61044_Cream_DA_MA_11-03-31_62644_BH_SKS.jpg?v=1772837968',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-24-26_S8_18_FNMDT61044_Cream_DA_MA_11-03-31_62673_BH_SKS.jpg?v=1772133574',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-24-26_S8_18_FNMDT61044_Cream_DA_MA_11-03-31_62671_BH_SKS.jpg?v=1772133574'
        ],
        'canon-contrast-collar-zip-up-shirt-taupe': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-19-26_S7PM_14_SS26J402F_Taupe_ZSR_AB_DJ_18-22-08_75260_SG_SKS.jpg?v=1771885987',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-19-26_S7PM_14_SS26J402F_Taupe_ZSR_AB_DJ_18-21-43_75254_SG_SKS.jpg?v=1771885987',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-19-26_S7PM_14_SS26J402F_Taupe_ZSR_AB_DJ_18-22-20_75270_SG_SKS.jpg?v=1771885980',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-19-26_S7PM_14_SS26J402F_Taupe_ZSR_AB_DJ_18-22-46_75276_SG_SKS_SG.jpg?v=1771885979'
        ],
        'cornell-wide-leg-stacked-jean-bleached-blue-wash': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/06-19-24_S7_1_ZAPP977_White_ID_DJ_09-40-30_108912_PXF.jpg?v=1719245370',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/06-19-24_S7_1_ZAPP977_White_ID_DJ_09-39-46_108899_PXF_eb4e4469-9e93-41b2-9385-293b6c4117e3.jpg?v=1719245370',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/06-19-24_S7_1_ZAPP977_White_ID_DJ_09-41-06_108913_PXF.jpg?v=1719244702',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/06-19-24_S7_1_ZAPP977_White_ID_DJ_09-41-34_108917_PXF.jpg?v=1719244702'
        ],
        'cornell-wide-leg-stacked-jean-white': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/06-30-23Studio7_CB_DJ_10-36-20_30_ZDF01D310023_White_7720_MP.jpg?crop=center&height=1825&v=1689986050&width=1200',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/07-07-23Studio7_CB_DJ_12-59PM_2_ZDF01D310023_White_24699_PLUS_MP.jpg?crop=center&height=1800&v=1753743000&width=1200',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/06-30-23Studio7_CB_DJ_10-36-20_30_ZDF01D310023_White_7720_MP.jpg?v=1689986050&width=800&height=1200&crop=center',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/07-07-23Studio7_CB_DJ_12-59PM_2_ZDF01D310023_White_24699_PLUS_MP.jpg?v=1753743000&width=800&height=1200&crop=center'
        ],
        'cuff-me-stacked-skinny-flared-jean-grey': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/ZDF01D330003_Grey_42_Grey_PLUS_V1.jpg?v=1784053180&width=800&height=1200&crop=center',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/ZDF01D330003_Grey_42_Grey_PLUS_V2.jpg?v=1784053168&width=800&height=1200&crop=center',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/ZDF01D330003_Grey_42_Grey_PLUS_V3.jpg?v=1784053167&width=800&height=1200&crop=center',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/ZDF01D330003_Grey_42_Grey_PLUS_V4.jpg?v=1784053170&width=800&height=1200&crop=center'
        ],
        'deylen-relaxed-cargo-short-camouflage': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-09-24_S7_70_ZDF01H410095_Camouflage_P_CZ_DJ_13-51-02_42023_CM.jpg?v=1712861252',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-09-24_S7_70_ZDF01H410095_Camouflage_P_CZ_DJ_13-51-02_42024_CM.jpg?v=1712861252',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-09-24_S7_70_ZDF01H410095_Camouflage_P_CZ_DJ_13-51-02_42025_CM.jpg?v=1712861252',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-09-24_S7_70_ZDF01H410095_Camouflage_P_CZ_DJ_13-51-02_42027_CM.jpg?v=1712861252'
        ],
        'drilled-slim-stacked-jean-black-wash': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/07-18-24_S7_40_ZDF01D420006_BlackWash_CZ_DJ_11-47-43_52897_SL.jpg?v=1721928392',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/07-18-24_S7_40_ZDF01D420006_BlackWash_CZ_DJ_11-47-43_52896_SL.jpg?v=1721928392',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/07-18-24_S7_40_ZDF01D420006_BlackWash_CZ_DJ_11-47-43_52898_SL.jpg?v=1721928392',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/07-18-24_S7_40_ZDF01D420006_BlackWash_CZ_DJ_11-47-43_52899_SL.jpg?v=1721928392'
        ],
        'i-be-jeweled-wide-leg-stacked-jean-light-blue': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-19-24_S7_71_GFL4_LightBlue_P_CZ_DJ_14-35-09_31382_EH.jpg?v=1708621697',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-19-24_S7_71_GFL4_LightBlue_P_CZ_DJ_14-33-40_31372_EH.jpg?v=1708621697',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-19-24_S7_71_GFL4_LightBlue_P_CZ_DJ_14-34-06_31379_EH.jpg?v=1708621697',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/02-19-24_S7_71_GFL4_LightBlue_P_CZ_DJ_14-35-12_31383_EH.jpg?v=1708621697'
        ],
        'kaine-stacked-slim-jean-black-wash': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-08-25_S7_74_ZDF01D440006_BlackWash_KJ_DJ_12-01-33_64605_PXF.jpg?v=1737151241',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-08-25_S7_74_ZDF01D440006_BlackWash_KJ_DJ_12-01-33_64604_PXF.jpg?v=1737151241',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-08-25_S7_74_ZDF01D440006_BlackWash_KJ_DJ_12-01-33_64602_PXF.jpg?v=1737151241',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/01-08-25_S7_74_ZDF01D440006_BlackWash_KJ_DJ_12-01-33_64609_PXF.jpg?v=1737151241'
        ],
        'laredo-paisley-shirt-black-white': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/05-06-24_s7_44_ZDF01V410200_BlackWhite_ID_DJ_13-31-38_87065_BH.jpg?v=1715704120',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/05-06-24_s7_44_ZDF01V410200_BlackWhite_ID_DJ_13-31-18_87059_BH.jpg?v=1715704120',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/05-06-24_s7_44_ZDF01V410200_BlackWhite_ID_DJ_13-31-42_87066_BH.jpg?v=1715704120',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/05-06-24_s7_44_ZDF01V410200_BlackWhite_ID_DJ_13-31-49_87068_BH.jpg?v=1715704120'
        ],
        'matrix-power-crochet-johnny-collar-polo-blue': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-27-26_S1_32_FNM041619T_Blue_LR_PC_15-07-49_25914_PXF.jpg?v=1775241040',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-27-26_S1_32_FNM041619T_Blue_LR_PC_15-07-49_25913_PXF.jpg?v=1775241040',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-27-26_S1_32_FNM041619T_Blue_LR_PC_15-07-49_25915_PXF.jpg?v=1775241032',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-27-26_S1_32_FNM041619T_Blue_LR_PC_15-07-49_25916_PXF.jpg?v=1775241032'
        ],
        'patriot-baggy-denim-short-light-wash': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-08-25_S7_52_ZDF01Y510006_LightWash_KJ_DJ_10-08-59_91450_CM.jpg?v=1741647133',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-08-25_S7_52_ZDF01Y510006_LightWash_KJ_DJ_10-09-46_91461_CM.jpg?v=1741647133',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-08-25_S7_52_ZDF01Y510006_LightWash_KJ_DJ_10-09-29_91456_CM.jpg?v=1741647133',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-08-25_S7_52_ZDF01Y510006_LightWash_KJ_DJ_10-09-31_91457_CM.jpg?v=1741647131'
        ],
        'relaxed-geometric-jewel-jacquard-short-grey': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-20-26_S6_43_D3016K239_Grey_LR_DJ_14-11-13_27319-Miller_PXF.jpg?v=1777494996',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-20-26_S6_43_D3016K239_Grey_LR_DJ_14-11-13_27320-Miller_PXF.jpg?v=1777494996',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-20-26_S6_43_D3016K239_Grey_LR_DJ_14-11-13_27321-Miller_PXF.jpg?v=1777494996',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-29-26_S8_48_D3016K239_Grey_KJ_MC_13-00-10_PLUS_90823_PXF_PLUS.jpg?v=1777932627'
        ],
        'rhinestone-bandana-wide-leg-stacked-jean-light-blue-wash': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-12-26_S8_15_ZAPP50560_LightBlueWash_KF_MC_10-40-24_78681_SKS.jpg?v=1773675249',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-12-26_S8_15_ZAPP50560_LightBlueWash_KF_MC_10-40-24_78666_SKS.jpg?v=1773675249',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-12-26_S8_15_ZAPP50560_LightBlueWash_KF_MC_10-41-14_21631_SKS.jpg?v=1773675249',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/03-12-26_S8_15_ZAPP50560_LightBlueWash_KF_MC_10-40-24_78682_SKS.jpg?v=1773675249'
        ],
        'ripple-stripe-johnny-polo-charcoal': [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-09-26_S8_40_UN4227_Charcoal_JG_CW_11-15-45_12135_PXF.jpg?v=1776103062',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-09-26_S8_40_UN4227_Charcoal_JG_CW_11-15-27_12125_CM_CM.jpg?v=1776103062',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-09-26_S8_40_UN4227_Charcoal_JG_CW_11-15-47_12136_PXF.jpg?v=1776103062',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/04-09-26_S8_40_UN4227_Charcoal_JG_CW_11-16-20_12144_PXF.jpg?v=1776103062'
        ]
    });

    const fashionNovaOfficialCutouts = Object.freeze({
        'kaleido-bloom-crochet-button-up-shirt': 'assets/fashion-nova-upper-cutouts/kaleido-bloom-crochet-button-up-shirt.png',
        'boxy-soho-weave-applique-textured-button-up-shirt-black': 'assets/fashion-nova-upper-cutouts/boxy-soho-weave-applique-textured-button-up-shirt-black.png',
        'canyon-wave-johnny-polo-light-blue': 'assets/fashion-nova-upper-cutouts/canyon-wave-johnny-polo-light-blue.png',
        'desert-hues-crochet-button-up-shirt-brown': 'assets/fashion-nova-upper-cutouts/desert-hues-crochet-button-up-shirt-brown.png',
        'desert-hues-crochet-button-up-shirt-cream': 'assets/fashion-nova-upper-cutouts/desert-hues-crochet-button-up-shirt-cream.png',
        'relaxed-sunstage-crochet-cuban-collar-button-up-shirt-light-blue': 'assets/fashion-nova-upper-cutouts/relaxed-sunstage-crochet-cuban-collar-button-up-shirt-light-blue.png',
        'nolan-textured-shirt-green': 'assets/fashion-nova-upper-cutouts/nolan-textured-shirt-green.png',
        'relaxed-aegean-pleat-cuban-collar-button-up-cream': 'assets/fashion-nova-upper-cutouts/relaxed-aegean-pleat-cuban-collar-button-up-cream.png',
        'harbor-point-knit-johnny-collar-polo-cream': 'assets/fashion-nova-upper-cutouts/harbor-point-knit-johnny-collar-polo-cream.png',
        'solstice-knit-johnny-collar-polo-burgundy-combo': 'assets/fashion-nova-upper-cutouts/solstice-knit-johnny-collar-polo-burgundy-combo.png',
        'canon-contrast-collar-zip-up-shirt-taupe': 'assets/fashion-nova-upper-cutouts/canon-contrast-collar-zip-up-shirt-taupe.png',
        'laredo-paisley-shirt-black-white': 'assets/fashion-nova-upper-cutouts/laredo-paisley-shirt-black-white.png',
        'matrix-power-crochet-johnny-collar-polo-blue': 'assets/fashion-nova-upper-cutouts/matrix-power-crochet-johnny-collar-polo-blue.png',
        'ripple-stripe-johnny-polo-charcoal': 'assets/fashion-nova-upper-cutouts/ripple-stripe-johnny-polo-charcoal.png'
    });

    // Mockups PNG nuevos: se fuerzan como primera imagen también cuando el
    // catálogo se carga desde Supabase (no solo desde catalog-seed.json).
    const newPngMockups = Object.freeze({
        'pearl-wildin-camo-button-up-shirt': 'assets/mockups-finales/pearl-wildin-camo-button-up-shirt-mockup.png',
        'high-stepper-faux-leather-button-up-shirt': 'assets/mockups-finales/high-stepper-faux-leather-button-up-shirt-mockup.png',
        'scarface-the-world-is-yours-rhinestone-hoodie-black': 'assets/mockups-finales/scarface-the-world-is-yours-rhinestone-hoodie-black-mockup.png',
        'stacked-skinny-flare-crosses-upon-crosses-jeweled-jean-light-wash': 'assets/mockups-finales/stacked-skinny-flare-crosses-upon-crosses-jeweled-jean-light-wash-mockup.png',
        'undercover-slim-stacked-flare-jeans-vintage-blue-wash': 'assets/mockups-finales/undercover-slim-stacked-flare-jeans-vintage-blue-wash-mockup.png',
        'electric-sequin-star-denim-trucker-jacket-black-wash': 'assets/mockups-finales/electric-sequin-star-denim-trucker-jacket-black-wash-mockup.png',
        'counting-stars-stacked-slim-flare-jeans-black-wash': 'assets/mockups-finales/counting-stars-stacked-slim-flare-jeans-black-wash-mockup.png',
        'stacked-slim-flare-slashed-down-jean-black-wash': 'assets/mockups-finales/stacked-slim-flare-slashed-down-jean-black-wash-mockup.png',
        'space-jam-toon-squad-paneled-zip-up-hoodie-white': 'assets/mockups-finales/space-jam-toon-squad-paneled-zip-up-hoodie-white-mockup.png',
        'king-faux-leather-moto-bomber-jacket-navy-combo': 'assets/mockups-finales/king-faux-leather-moto-bomber-jacket-navy-combo-mockup.png',
        'stacked-skinny-flare-street-monarch-jeweled-jean-light-wash': 'assets/mockups-finales/stacked-skinny-flare-street-monarch-jeweled-jean-light-wash-mockup.png',
        'see-it-through-bleached-stacked-skinny-flare-jeans-light-wash': 'assets/mockups-finales/see-it-through-bleached-stacked-skinny-flare-jeans-light-wash-mockup.png',
        'about-fray-stacked-skinny-flare-jeans-vintage-blue-wash': 'assets/mockups-finales/about-fray-stacked-skinny-flare-jeans-vintage-blue-wash-mockup.png',
        'chamarra-feelin-a-way-tapestry-zip': 'assets/mockups-finales/chamarra-feelin-a-way-tapestry-zip-mockup.png',
        'retro-rib-wool-varsity-jacket': 'assets/mockups-finales/retro-rib-wool-varsity-jacket-mockup.png',
        'onyx-cognac-zip-up-shirt': 'assets/mockups-finales/onyx-cognac-zip-up-shirt-mockup.png',
        'time-warp-printed-bomber-jacket': 'assets/mockups-finales/time-warp-printed-bomber-jacket-mockup.png',
        'kaleido-bloom-crochet-button-up-shirt': 'assets/mockups-finales/kaleido-bloom-crochet-button-up-shirt-mockup.png',
        'relaxed-washed-abstract-camo-bomber-jacket-camouflage': 'assets/mockups-finales/relaxed-washed-abstract-camo-bomber-jacket-camouflage-mockup.png',
        'both-ways-slim-stacked-flared-pants': 'assets/mockups-finales/both-ways-slim-stacked-flared-pants-mockup.png',
        'stacked-slim-flare-fray-waves-jeans-light-wash': 'assets/mockups-finales/stacked-slim-flare-fray-waves-jeans-light-wash-mockup.png',
        'stacked-skinny-flare-mystic-embroidered-jean-black-wash': 'assets/mockups-finales/stacked-skinny-flare-mystic-embroidered-jean-black-wash-mockup.png',
        'retrofuture-street-bomber-jacket': 'assets/mockups-finales/retrofuture-street-bomber-jacket-mockup.png',
        'tayson-bones-skinny-flare-sweatpants-black': 'assets/mockups-finales/tayson-bones-skinny-flare-sweatpants-black-mockup.png',
        'shadow-panel-button-up-taupe-combo': 'assets/mockups-finales/shadow-panel-button-up-taupe-combo-mockup.png',
        'all-you-need-is-tapestry-trucker-jacket-verde-combinado': 'assets/mockups-finales/all-you-need-is-tapestry-trucker-jacket-verde-combinado-mockup.png',
        'blessed-endless-sweatpant-negro': 'assets/mockups-finales/blessed-endless-sweatpant-negro-mockup.png',
        'burning-bridges-hoodie-azul': 'assets/mockups-finales/burning-bridges-hoodie-azul-mockup.png',
        'cropped-embellished-denim-button-up-shirt-marron': 'assets/mockups-finales/cropped-embellished-denim-button-up-shirt-marron-mockup.png',
        'singleton-short-sleeve-knit-polo-navy': 'assets/mockups-finales/singleton-short-sleeve-knit-polo-navy-mockup.png',
        'heritage-color-blocked-hooded-jacket-negro': 'assets/mockups-finales/heritage-color-blocked-hooded-jacket-negro-mockup.png',
        'baggy-paisley-jacquard-denim-short-deslavado-oscuro': 'assets/mockups-finales/baggy-paisley-jacquard-denim-short-deslavado-oscuro-mockup.png',
        'star-spangled-denim-trucker-jacket-black-wash': 'assets/mockups-finales/star-spangled-denim-trucker-jacket-black-wash-mockup.png',
        'stacked-skinny-flare-fringe-blade-jeans-black-wash': 'assets/mockups-finales/stacked-skinny-flare-fringe-blade-jeans-black-wash-mockup.png',
        'got-me-destroyed-stacked-skinny-flare-jeans-light-blue': 'assets/mockups-finales/got-me-destroyed-stacked-skinny-flare-jeans-light-blue-mockup.png',
        'baggy-lester-cargo-pants-brown': 'assets/mockups-finales/baggy-lester-cargo-pants-brown-mockup.png'
    });

    // Mockups que ya existen en el lote principal. Se fuerzan también para
    // filas antiguas de Supabase que todavía conservan la foto de modelo.
    const legacyPatternSlugs = new Set([
        'stacked-skinny-sun-damage', 'tyson-lost-saints', 'day-to-day-cable-knit', 'carried-cargo-black',
        'be-brave-fearless', 'through-it-ripped', 'simi-fray-cargo',
        'loyalty-royalty-hoodie', 'cornell-slim-flare', 'on-the-set-stacked',
        'get-started-cargo', 'tapestry-hit-jean', 'malcom-x-hoodie',
        'paisley-jacquard-parka', 'phantom-bomber-charcoal', 'sherpa-aviator-brown',
        'contrast-varsity-blue', 'tyson-trust-issues', 'dope-dreams-hoodie',
        'saints-and-sinners-lifecycle-oversized-hoodie', 'dope-dreams-varsity-jacket',
        'faux-suede-embroidered-blossom-bomber-jacket', 'ghost-distressed-printed-denim-jacket',
        'saints-rhinestones-sweatpants', 'stacked-skinny-flare-be-brave-be-fearless-embridered-jean',
        'about-fray-stacked-skinny-flare-jeans-black-wash', 'move-up-plaid-shacket',
        'oversized-corduroy-hooded-bomber-jacket', 'pearl-wildin-camo-cargo-baggy-pants',
        'baggy-ghost-distressed-printed-jean', 'saints-rhinestones-oversized-hoodie',
        'about-fray-stacked-skinny-flare-jeans-light-wash', 'stacked-skinny-flare-frayed-along-panel-jean',
        'straight-flare-static-drip-jeweled-jean', 'padded-hooded-faux-trim-iced-out-parka',
        'cowboys-monster-oversized-zip-up-hoodie', 'heartbreakers-players-club-skinny-flare-sweatpants-black',
        'unknown-fate-flared-sweatpants-black', 'all-around-fray-stacked-skinny-flare-pants-brown-combo',
        'bold-flock-hoodie-black', 'look-at-me-stacked-skinny-jeans-vintage-blue-wash',
        'lakers-wavey-oversized-zip-hoodie-purple', 'lakers-wavey-wide-sweatpants-purple',
        'tumble-slim-flare-jeans-light-blue-wash', 'contrast-skinny-stacked-flared-cargo-pants-camouflage',
        'textured-cable-knit-cabin-puffer-jacket-yellow', 'in-the-cut-camo-sweatpants-grey-combo',
        'in-the-cut-camo-zip-up-hoodie-grey-combo', 'tyson-die-rich-quarter-zip-sweatshirt-black-wash',
        'antisocial-rhinestone-pearl-oversized-hoodie-navy', 'cropped-utility-corduroy-collar-work-jacket-olive',
        'relaxed-96-faux-pebble-leather-varsity-jacket-navy', 'rosa-parks-nah-embroidered-hoodie-black',
        'heartbreakers-players-club-hoodie-black', 'nyc-all-star-hoodie-powder-blue',
        'skeleton-stars-embroidered-oversized-hoodie-black',
        'cropped-paisley-jacquard-denim-work-jacket-dark-wash'
    ]);

    const legacyMockupExceptions = Object.freeze({
        '49ers-monster-oversized-zip-up-hoodie-red': 'mockups-finales/11-11-25_S8_5_JZML095FSFFS_Red_AB_DJ_09-51-32_98672_PXF-mockup.webp',
        'cropped-moto-black': 'mockups-finales/cropped-moto-black-3-mockup.webp',
        'bulls-campus-zip': 'mockups-finales/bulls-campus-zip-6-mockup.webp',
        'cropped-coated-padded-faux-leather-bomber-jacket': 'mockups-finales/cropped-coated-padded-faux-leather-bomber-jacket-3-mockup.webp'
    });

    const mockupSlugs = new Set([
        'cassiel-tapestry-cropped-button-up-shirt-multi-color',
        'paisley-flock-hoodie-black',
        'cropped-high-stepper-faux-leather-button-up-shirt-dark-grey',
        'lakers-loud-crewneck-sweatshirt-purple',
        'relaxed-sunset-fever-faux-leather-polo-black',
        'stacked-skinny-flare-frayed-along-panel-jean-black-wash',
        'rebellion-cross-applique-zip-up-hoodie-light-blue',
        'rush-home-denim-cargo-shorts-light-blue-wash',
        'tyson-chaos-oversized-zip-hoodie-black',
        'pablo-picasso-colorblock-varsity-jacket-pink-combo',
        'city-of-dreams-all-over-printed-bomber-jacket-black-white',
        'embroidery-fleur-oversized-cropped-fleece-jacket-cream',
        'la-patchwork-varsity-jacket-royal-combo',
        'in-bloom-printed-bomber-jacket-black',
        'ditson-tapestry-varsity-jacket-red-combo',
        'kings-canyon-padded-trucker-jacket-multi-color',
        'lets-go-fray-cargo-skinny-flare-jeans-light-wash',
        'zip-it-faux-leather-slim-cargo-pants-black',
        'fray-all-ways-stacked-skinny-flare-jeans-light-blue',
        'ruthless-embroidered-stacked-skinny-cargo-flare-jeans-medium-wash',
        'kaine-stacked-slim-flare-jeans-black-wash',
        'stacked-skinny-flare-jeweled-sky-rays-jean-light-blue-wash',
        'harvy-straight-pants-camouflage',
        'saint-embroidered-short-sleeve-button-up-off-white',
        'oversized-desert-vibe-polo-shirt-grey',
        'tyson-curated-oversized-hoodie-black-wash',
        'ryan-interlock-bomber-jacket-taupe',
        'paneled-utility-bomber-jacket-taupe',
        'lido-isle-crochet-button-up-shirt-cream',
        'lions-monster-oversized-zip-up-hoodie-light-blue',
        'stacked-skinny-flare-with-camo-hit-jean-grey',
        'tyson-stars-skinny-flared-sweatpants-heather-grey',
        'tyson-number-3-skinny-flare-sweatpants-black-combo',
        'cornell-slim-flare-jeans-light-wash'
    ]);

    function mockupFor(slug = '') {
        const normalized = String(slug).trim().toLowerCase();
        if (newPngMockups[normalized]) return newPngMockups[normalized];
        const legacyMockup = window.LynxLegacyProductMockups?.[normalized];
        if (legacyMockup) return legacyMockup;
        if (legacyMockupExceptions[normalized]) return legacyMockupExceptions[normalized];
        if (legacyPatternSlugs.has(normalized)) return `mockups-finales/${normalized}-1-mockup.webp`;
        return mockupSlugs.has(normalized)
            ? `mockups-agosto-22-finales/${normalized}-mockup.webp`
            : '';
    }

    function withMockup(slug, images = []) {
        const normalizedSlug = String(slug || '').trim().toLowerCase();
        const officialGallery = fashionNovaOfficialGalleries[normalizedSlug];
        const officialCutout = fashionNovaOfficialCutouts[normalizedSlug];
        if (officialGallery?.length) {
            return officialCutout ? [officialCutout, ...officialGallery] : [...officialGallery];
        }
        if (officialCutout) return [officialCutout, ...((Array.isArray(images) ? images : []).filter(Boolean))];
        const originals = Array.isArray(images) ? images.filter(Boolean) : [];
        const mockup = mockupFor(slug);
        if (!mockup) return originals;
        const normalizedMockup = mockup.replace(/^\//, '');
        const imagePath = value => {
            const rawValue = String(value).trim();
            try {
                return new URL(rawValue, location.href).pathname.replace(/^\/+/, '').split(/[?#]/, 1)[0];
            } catch (_) {
                return rawValue.replace(/^\/+/, '').split(/[?#]/, 1)[0];
            }
        };
        const mockupFamily = imagePath(normalizedMockup).replace(/\.(?:png|webp)$/i, '');
        const isSameMockupFamily = image => {
            const normalizedImage = imagePath(image);
            return normalizedImage === imagePath(normalizedMockup)
                || normalizedImage.replace(/\.(?:png|webp)$/i, '') === mockupFamily;
        };
        return [mockup, ...originals.filter(image => !isSameMockupFamily(image))];
    }

    window.LynxProductImages = Object.freeze({ mockupFor, withMockup });
}());
