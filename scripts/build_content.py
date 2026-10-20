import json
import os

# Definition of the 5 businesses and their specific data for each of the 12 stages
BUSINESS_PROFILES = {
    'marmitaria': {
        'owner': 'Dona Socorro',
        'bizName': 'Marmitaria da Socorro',
        'city': 'Crato / Vila Araripe',
        'product': 'quentinhas e marmitas caseiras',
        'productUnit': 'marmita',
        'productPlural': 'marmitas',
        'price': 15.00,
        'cvu': 8.40,
        'dailyFixed': 35.00,
        'fixedMonthly': 1050.00,
        'proLabore': 2000.00,
        'equipment': 'fogão industrial de alta chama e freezer duplex',
        'supplier': 'açougueiro e feirante de legumes'
    },
    'barraca_romaria': {
        'owner': 'Seu Expedito',
        'bizName': 'Barraca de Romaria do Seu Expedito',
        'city': 'Juazeiro do Norte',
        'product': 'artigos religiosos, terços e imagens do Padre Cícero',
        'productUnit': 'artigo religioso',
        'productPlural': 'artigos religiosos',
        'price': 22.00,
        'cvu': 11.00,
        'dailyFixed': 20.00,
        'fixedMonthly': 600.00,
        'proLabore': 1800.00,
        'equipment': 'toldo desmontável reforçado e bancada expositora',
        'supplier': 'artesão de gesso e distribuidor de fitas'
    },
    'atelie_couro': {
        'owner': 'Mestre Valdir',
        'bizName': 'Ateliê Couro & Palha',
        'city': 'Nova Olinda / Crato',
        'product': 'bolsas, gibões e peças tradicionais de couro',
        'productUnit': 'peça de couro',
        'productPlural': 'peças de couro',
        'price': 85.00,
        'cvu': 34.00,
        'dailyFixed': 28.00,
        'fixedMonthly': 840.00,
        'proLabore': 2200.00,
        'equipment': 'máquina de costura pesada e desbastadeira de couro',
        'supplier': 'curtume tradicional e fornecedor de fivelas'
    },
    'bodega_bairro': {
        'owner': 'Seu Zé da Bodega',
        'bizName': 'Bodega do Bairro da Vila',
        'city': 'Barbalha',
        'product': 'secos e molhados na caderneta de fiado',
        'productUnit': 'cesta de compras',
        'productPlural': 'compras',
        'price': 18.00,
        'cvu': 13.50,
        'dailyFixed': 50.00,
        'fixedMonthly': 1500.00,
        'proLabore': 2000.00,
        'equipment': 'freezer expositor vertical e balança digital com leitor',
        'supplier': 'distribuidor atacadista de alimentos e bebidas'
    },
    'banca_feira': {
        'owner': 'Dona Maria dos Cocos',
        'bizName': 'Banca de Frutas & Raízes',
        'city': 'Crato (Feira Livre)',
        'product': 'macaxeira, feijão-verde e frutas da agricultura familiar',
        'productUnit': 'porção de feira',
        'productPlural': 'porções de feira',
        'price': 7.00,
        'cvu': 3.80,
        'dailyFixed': 15.00,
        'fixedMonthly': 450.00,
        'proLabore': 1600.00,
        'equipment': 'balança digital a bateria e caixas térmicas padronizadas',
        'supplier': 'pequenos agricultores e freteiro da caminhonete'
    }
}

print("Profiles defined successfully")
