import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('@/component/shared/Navbar/Navbar'), {
  ssr: false,
})
const Footer = dynamic(() => import('@/component/shared/Footer/Footer'), {
  ssr: false,
})
import Head from 'next/head'
import PrivacyContent from '../src/component/privacy/privacyContent/PrivacyContent'

function Terms({ loginOpen, setLoginOpen, handleLoginOpen, handleLoginClose }) {
  const contents = [
    {
      title: ' 1. Introdução',
      description: (
        <Stack spacing={1}>
          <Typography>
            Estes Termos de uso (“Termos”) regulam o seu acesso a plataformas,
            sites de internet, produtos, conteúdos e serviços em geral
            (conjuntamente, os “Serviços”), para as especificações especificadas
            nestes Termos, disponibilizados e/ou prestados pela Lokkan Soluções
            Imobiliárias (“Lokkan”), sociedade de responsabilidade limitada,
            inscrita no Cadastro Nacional de Pessoas Jurídicas sob o nº
            24.713.429/0001-94 e inscrições no CRECI sob o nº 028810-J, com sede
            na Rodovia Bunjiro Nakao, 910, Curral, Ibiúna, estado de São Paulo
            18150-000, local onde ocorreu a administração, o estabelecimento e a
            prestação de serviços do Lokkan.
          </Typography>
          <Typography>
            Ao acessar ou utilizar os Serviços do Lokkan, você concorda
            expressamente com estes Termos, que estabelecem e regem a relação
            contratual entre você (usuário dos Serviços) e o Lokkan, confirmando
            estar sujeito a eles. Caso você não concorde com estes Termos, você
            não poderá acessar e/ou contratar os Serviços. a Lokkan poderá
            alterar estes Termos a qualquer momento e tais alterações entrarão
            em vigor imediatamente após a postagem da versão atualizada dos
            Termos neste domínio (https://www.lokkan.com.br/termos). O fato de
            você continuar acessando ou utilizando os Serviços após essa
            postagem representa sua ciência e facilidade quanto à sua vinculação
            aos Termos atualizados.
          </Typography>

          <Typography>
            Conforme o disposto no item 3 destes Termos, a Lokkan disponibiliza
            diversos tipos de produtos e serviços para o Usuário, que, em caso
            de contratação, serão regidos adicionalmente pelos Contratos a serem
            contratados entre as Partes (os “Contratos”) e eventualmente termos
            específicos Além disso, conforme descrito nos documentos referidos.
            As Partes regularizam que, em caso de conflito entre disposições,
            prevalecerão as informações constantes nos Contratos e termos
            específicos adicionais, e não as previstas nestes Termos.
          </Typography>
          <Typography>
            Antes de utilizar os Serviços, leia atentamente estes Termos, que
            contêm informações importantes sobre os seus direitos, as suas
            obrigações e sobre os Serviços.
          </Typography>
        </Stack>
      ),
    },
    {
      title: ' 2. Definições',
      description: (
        <Stack spacing={1}>
          <Typography>
            <span style={{ fontWeight: 600 }}>Anúncio –</span> Publicação de
            imóveis na plataforma que está disponível para venda. A mobília ou
            itens previstos nas fotos não acompanham necessariamente o imóvel na
            compra e venda. Verifique a disponibilidade dos itens.
          </Typography>
          <Typography>
            <span style={{ fontWeight: 600 }}>Comprador –</span>
            Pessoa que está buscando ou já está em negociação para comprar um
            imóvel pelo Lokkan.
          </Typography>
          <Typography>
            <span style={{ fontWeight: 600 }}>Corretor Associado –</span>{' '}
            Credenciado pelo CRECI, é uma pessoa que presta o serviço de
            corretagem de imóveis aos Proprietários e acompanha possíveis
            inquilinos e compradores durante as visitas aos imóveis.
          </Typography>
          <Typography>
            <span style={{ fontWeight: 600 }}>Diligência –</span> Análise de
            documentos relacionados ao Imóvel, Proprietário e Comprador para
            verificar a situação do Imóvel e ser transparente com o Comprador
            sobre os riscos envolvidos na negociação.
          </Typography>
          <Typography>
            <span style={{ fontWeight: 600 }}>Fotógrafo Parceiro –</span>{' '}
            Prestador de Serviço Independente que realiza as fotos e vídeos que
            serão publicados no anúncio do imóvel. O Fotógrafo Parceiro cede,
            total e definitivamente, os direitos autorais do material produzido
            para Lokkan.
          </Typography>
          <Typography>
            <span style={{ fontWeight: 600 }}>Proprietário –</span> Pessoa que
            possui imóvel - se declarando legítimo possuidor deste, que se
            encontra livre e desimpedido - ou é representante legal deste e
            deseja anunciá-lo na Lokkan para aluguel e/ou venda.
          </Typography>
          <Typography>
            <span style={{ fontWeight: 600 }}>Serviços –</span> Todos os
            serviços e produtos do Lokkan, incluindo também a divulgação,
            intermediação e venda através das plataformas.
          </Typography>
          <Typography>
            <span style={{ fontWeight: 600 }}>Plataforma -</span> Plataforma
            Tecnológica oferecida pela Lokkan, composta por sites, sistemas e
            aplicativos móveis, dedicada à prestação e intermediação dos
            Serviços.
          </Typography>
        </Stack>
      ),
    },
    {
      title: '3. Escopo dos serviços',
      description: (
        <Typography>
          A Lokkan possui diferentes modelos de serviço, que podem variar de
          escopo/disponibilidade conforme a localização do imóvel objeto da
          transação e respectiva gama de serviços oferecidos pela Lokkan na
          localidade referida.
        </Typography>
      ),
    },
    {
      title: '3.1 Intermediação de Compra e Venda',
      description: (
        <Stack spacing={1}>
          <Typography>
            A Intermediação da Compra e Venda representa um pacote de serviços
            oferecidos pelos Corretores Associados e Lokkan que poderá incluir:
            (i) contratação de serviços de fotografia; (ii) finalização e
            divulgação de anúncio na Plataforma e outros sites de classificados;
            (iii) coordenação do agendamento e execução de visitas ao imóvel;
            (iv) facilitação da negociação entre as Partes na Plataforma, (v)
            Diligência Lokkan e (vi) elaboração do Compromisso de Compra e
            Venda.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            A taxa de Intermediação de Compra e Venda é igualmente devida em
            caso de negociação entre Proprietário e comprador Decorrente do
            Direito de Preferência do Inquilino em uma transação em curso
            intermediado pela Lokkan, considerando que a aproximação das partes
            ocorreu através da plataforma, ainda que seja feita diretamente
            entre as partes ou com ajuda de terceiros.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Anúncio. O Proprietário/corretor preenche os dados solicitados no
            cadastro do imóvel, autorizando que o Lokkan entre em contato para
            entender e auxiliar a publicação do anúncio de venda.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Visitas de potenciais compradores e propostas. Após o Proprietário
            fornecer todas as informações necessárias à sua publicação, sendo a
            veracidade dessas informações de plena e total responsabilidade do
            Proprietário, o Anúncio será publicado na plataforma do Lokkan após
            a realização da sessão de fotos e vídeo do imóvel por
            Fotógrafos/corretores Parceiros.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Após o imóvel ser anunciado, o Proprietário deverá indicar os
            horários disponíveis para visitas dos potenciais Compradores junto
            ao Lokkkan. O Comprador poderá fazer uma proposta após o agendamento
            da visita ao imóvel, e informar se a compra será feita com
            financiamento ou à vista, pois isso impactará nos prazos e
            procedimentos seguintes.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Se optar pelo financiamento, o Comprador poderá apresentar uma
            proposta de comprovação de crédito imobiliário. O fato de não ter um
            crédito imobiliário pré-aprovado não impede o comprador de fazer uma
            proposta e buscar financiamento depois da proposta. Destaca-se,
            contudo, que a aprovação do crédito será uma condicionante para a
            posterior assinatura do Compromisso de Compra e Venda.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Compromisso de Compra e Venda (CCV). O Lokkan poderá entrar em
            contato com o Comprador por telefone, e-mail ou outro meio eficiente
            de contato, para confirmar a proposta e entender a composição dos
            valores envolvidos, como: valor total da proposta, valor de entrada,
            valor eventualmente disponível do FGTS , valor financiado, valores
            de ITBI (Imposto sobre a Transmissão de Bens Imóveis), valor de
            Registro e de Escritura. A Lokkan também poderá solicitar o envio de
            outros documentos e a confirmação da proposta feita por e-mail.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            A Lokkan formaliza a proposta por meio da assinatura do Compromisso
            de Compra e Venda entre o Proprietário e o Comprador. Para isso,
            deverá ser enviado alguns documentos para o Lokkan e informados os
            dados necessários para qualificação das Partes no Compromisso, como:
            estado civil, endereço completo e a existência de outros
            Proprietários ou Compradores. O compromisso deverá ser assinado pelo
            promitente vendedor, promitente comprador eventualmente, parceiros e
            companheiros, além de testemunhas, na forma da Lei.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            O Comprador e o Proprietário só têm garantias e obrigados às
            condições da proposta após a assinatura do Compromisso. Após 5
            (cinco) dias da disponibilização do termo do Compromisso e se não
            houver resposta de uma ou ambas as Partes, a Lokkan está autorizada,
            por seu único e exclusivo sorteio, a invalidar o Compromisso de
            Compra e Venda e retirá-lo da plataforma , devendo as partes
            repetirem o processo de proposta e acessível na Plataforma Lokkan
            para retomar as negociações.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Após a assinatura do Compromisso de Compra e Venda, Comprador e
            Vendedor estão legalmente obrigados a seguir com o negócio. Porém
            com a Compra Garantida da Lokkan o comprador está protegido na
            hipótese do imóvel e/ou o proprietário apresenta alguma
            irregularidade jurídica, hipóteses, em que, por solicitação do
            comprador o negócio será rescindido unilateralmente e reembolsado,
            em até 7 (sete) dias úteis , o sinal de pagamento.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Taxa de Corretagem. Pelo serviço de intermediação de Compra e Venda,
            é devido pelo Vendedor a Lokkan e ao(s) Corretor(es) Associado(s) a
            Taxa de Corretagem, que corresponde a 6% do valor da venda. A Lokkan
            emitirá NFS-e pelos serviços que prestarão diretamente ao Vendedor e
            farão o repasse do valor devido aos Corretores Associados, que serão
            responsáveis ​​pela emissão de nota contra o Vendedor no valor que
            eles couberem.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Processo de registro. Após a assinatura do CCV e a liberdade da
            Diligência, as Partes serão integralmente responsáveis ​​por seguir
            com o processo de registro da transação de acordo com a forma de
            pagamento escolhida pelo Comprador e refletida no CCV. Todas as
            obrigações e custos relativos ao processo de registro e decisão da
            transação serão de responsabilidade integral do Comprador e
            Vendedor, conforme disposto no CCV contratado pelas Partes. A Lokkan
            permanecerá à disposição das Partes para tirar eventuais dúvidas até
            o registro da transação.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Em determinadas localidades, o Lokkan oferecerá modelos de serviços
            de e venda com características diversas em relação às específicas no
            item acima. Tais serviços serão regidos adicionalmente pelos Termos
            e Condições especificados, em conformidade com as disposições
            abaixo:
          </Typography>
        </Stack>
      ),
    },
    {
      title: '4. Divulgação',
      description: (
        <Stack spacing={1}>
          <Typography>
            O anúncio do seu imóvel, além de publicado e divulgado no Lokkan,
            poderá ser indexado em buscadores para ganhar maior visibilidade e
            aumentar o alcance a pessoas interessadas na compra e venda.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            A indexação é um processo que consiste na divulgação do anúncio em
            buscadores na internet, ou seja, quando alguém estiver buscando um
            imóvel para comprar, poderá encontrar mais facilmente o seu anúncio.
            Nesse caso, uma pessoa interessada será remetida ao buscador na
            Plataforma do Lokkan para agendar visitas ou fazer propostas.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Além disso, o anúncio do seu imóvel poderá ser divulgado em
            sociedades anônimas e em plataformas de imobiliárias parceiras da
            Lokkan.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Você é integralmente responsável pelo preço do seu anúncio, bem como
            pelas modificações eventuais que você fizer ou autorizar.
          </Typography>
        </Stack>
      ),
    },
    {
      title: '5. Condições de uso',
      description: (
        <Stack spacing={1}>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            A Lokkan exerce o papel de intermediador entre os Usuários de suas
            Plataformas, os quais possuem interesse no Contrato de Locação ou de
            Compra e Venda referente aos imóveis anunciados.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Os serviços destinam-se exclusivamente a pessoas capazes de exercer
            atos da vida civil, portanto, qualquer acesso ou uso das plataformas
            Lokkan por menores de 18 anos não emancipados é expressamente
            proibido. Dessa forma, ao utilizar o Lokkan você garante que é capaz
            de exercer pessoalmente os atos da vida civil.
          </Typography>
          <Typography>
            Para saber as condutas esperadas dos usuários Lokkan acesse nosso
            Manual da Pessoa Usuária. O Lokkan poderá a seu exclusivo exclusivo,
            em caso de suspeita de fraude na utilização das Plataformas, do
            descumprimento destes Termos ou do Manual da Pessoa Usuária,
            interromper e/ou excluir o Usuário responsável e suspender,
            temporariamente, o acesso aos serviços disponibilizados.
          </Typography>
        </Stack>
      ),
    },
    {
      title: '6. Responsabilidades',
      description: (
        <Stack spacing={1}>
          <Typography>A Lokkan não se responsabiliza:</Typography>
          <ul>
            <li>
              <Typography>
                Por qualquer transação realizada diretamente entre Proprietários
                e Compradores, mesmo que as Partes tenham sido conhecidas por
                meio da Plataforma.
              </Typography>
            </li>
            <li>
              <Typography>
                Pelo livre compartilhamento de dados entre Proprietários e
                Compradores realizado através do chat da plataforma Lokkan sem a
                necessidade ou conexão aos processos de locação ou compra e
                venda intermediados pela plataforma.
              </Typography>
            </li>
            <li>
              <Typography>
                A Lokkan não é responsável por quaisquer danos ou indenizações
                decorrentes de falha no cumprimento de obrigações de qualquer
                Usuário.
              </Typography>
            </li>
            <li>
              <Typography>
                Pelas obrigações tributárias decorrentes das atividades dos
                usuários relacionadas à utilização da Plataforma. O Usuário é
                exclusivamente e integralmente responsável por todos os
                tributos, impostos e taxas, incidentes sobre suas atividades
                relacionadas à utilização da Plataforma ou Serviços da Lokkan.
              </Typography>
            </li>
            <li>
              <Typography>
                Pela conduta dos Usuários ou de terceiros contratados por meio
                da Plataforma. A Lokkan não se responsabiliza por qualquer ato
                ou omissão de qualquer Usuário em relação a outros Usuários ou
                terceiros.
              </Typography>
            </li>
            <li>
              <Typography>
                Por dados desatualizados, incompletos ou inverídicos
                disponibilizados e atualizados por terceiros; como os de
                instituições financeiras, sites usados ​​para anúncios e demais
                parceiros comerciais.
              </Typography>
            </li>
            <li>
              <Typography>
                Por quaisquer indisponibilidades ou erros apresentados na
                Plataforma, assim como por eventual defraudação da utilidade que
                o Usuário possa colocar na Plataforma.
              </Typography>
            </li>
            <li>
              <Typography>
                Por erros ou eventuais inconsistências na transmissão de dados,
                pela qualidade ou disponibilidade de conexão de Internet, que
                impeçam a coleta de informações pelo Lokkan ou pelo Usuário.
              </Typography>
            </li>
            <li>
              <Typography>
                Por danos e prejuízos de toda natureza em decorrência de falha
                exclusivamente relacionada ao Usuário ou a terceiros que fujam a
                qualquer controle razoável da Lokkan.
              </Typography>
            </li>
          </ul>
        </Stack>
      ),
    },
    {
      title:
        '7. Preço dos serviços e atualização dos Corretores Associados a Lokkan',
      description: (
        <Stack spacing={1}>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Algumas categorias de Utilizadores poderão receber remunerações de
            acordo com os serviços que prestam a outros, por intermédio da
            Plataforma. Os valores a serem recebidos serão informados e poderão
            sofrer alterações sem aviso prévio.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            O Usuário tem ciência de que os corretores são contratados por
            Proprietários específicos na venda de seus imóveis, mediante taxa de
            corretagem, e que a Lokkan, como regra, repassará a corretagem
            devida aos Corretores Associados, que representa 70% (setenta)
            porcento do valor recebimento (6%), mediante apresentação de recibo
            de pagamento de autonomo e conforme previsto nos contratos de compra
            e venda e de associação.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            A Lokkan disponibilizará relatórios mensais dos repasses realizados
            aos Corretores Associados para garantir a transparência. Os
            Corretores Associados, como informações de serviços aos
            Proprietários, são responsáveis ​​pela emissão de recibo, documento
            fiscal ou quaisquer obrigações acessórias correspondentes ao
            pagamento da taxa de corretagem.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            A parcela de corretagem de qual a Lokkan será responsável por seguir
            as mesmas regras interessadas acima, e o contratante, isto é, o
            Proprietário, receberá o documento fiscal relacionado à respectiva
            operação transacionada sem percentual dos pagamentos pagos da
            Lokkan.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            O Usuário registra que, após a utilização dos serviços de
            intermediação imobiliária da Lokkan e seus Corretores Associados, se
            o Proprietário decidir celebrar um Contrato de Compromisso de Compra
            e Venda sem a intermediação da Lokkan, ainda assim será devido a
            corretagem prevista nestes Termos, em conformidade como artes. 725 e
            727 do Código Civil.
          </Typography>
        </Stack>
      ),
    },
    {
      title: '8. Privacidade e proteção de dados',
      description: (
        <Stack spacing={1}>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            O Lokkan atuará em conformidade com as leis de privacidade e
            proteção de dados, especialmente a Lei Federal nº 13.709/2018 – Lei
            Geral de Proteção de Dados Pessoais (LGPD), realizando o tratamento
            de dados pessoais do Usuário com a finalidade de viabilizar os
            serviços elencados no presente Termo.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            O Usuário está ciente de que seus dados pessoais poderão ser
            compartilhados com terceiros e que tal compartilhamento ocorrerá em
            observância aos princípios e obrigações trazidos pela LGPD.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            É de responsabilidade do Usuário garantir a veracidade e a
            atualização de seus dados pessoais transmitidos ao Lokkan para que
            seja possível a execução dos serviços.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Para mais informações a respeito do tratamento de dados pessoais
            pela Lokkan, consulte nossa Política de Privacidade.
          </Typography>
        </Stack>
      ),
    },
    {
      title: '9. Propriedade intelectual',
      description: (
        <Stack spacing={1}>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            A Lokkan é a única detentora de todos os direitos de propriedade
            intelectual relacionados à Plataforma e aos seus serviços, tais
            como: marcas, informações temporárias, segredos de negócio, direitos
            autorais, código-fonte, módulos, pacotes, estrutura de
            funcionamento, modelo de funcionamento funcionamento negócios,
            algoritmos e todas as informações relacionadas ao uso, funcionamento
            e demais dados e documentações.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            A Lokkan garante que é o titular da tecnologia e das ferramentas
            para execução dos serviços prestados, e, quando não for, detém as
            devidas autorizações para o uso das ferramentas. O banco de dados
            das Plataformas e os dados que o integram, brutos ou elaborados, são
            propriedade exclusiva da Lokkan, que sobre eles possui todos os
            direitos de propriedade intelectual. O Usuário possui uma licença
            limitada, revogável e não exclusiva para acessar a Plataforma e seus
            serviços com a finalidade de anunciar ou buscar imóveis para fins de
            locação ou aquisição, interagir com outros Usuários que tenham
            interesse em imóveis publicados na Plataforma e/ou realizar qualquer
            outra atividade segundo os propósitos relacionados aos produtos e
            serviços oferecidos pela Plataforma, sempre em observância e de
            acordo com os limites estabelecidos neste Termo.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            A licença concedida aos Usuários para acesso à Plataforma e seus
            serviços não permite que o Usuário ou terceiros realizem web
            crawling ou web scraping na Plataforma, seja por meio de robô,
            spider, scraper ou qualquer outro meio automatizado, tampouco copie,
            publique, promova, comercializar, integrar, utilizar, combinar ou
            usar o conteúdo disponível na Plataforma, sem autorização expressa
            por escrito da Lokkan.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            A restrição prevista pela licença concedida aos usuários abrange,
            igualmente, a concessão de compartilhamento de fotografias
            disponíveis em anúncios da Plataforma, tiradas por Fotógrafos
            Parceiros e de propriedade da Lokkan, inclusive para fins de
            publicação em anúncios em outras plataformas.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Nenhum item deste Termo é considerado como transferência ou cessão
            de direito de propriedade intelectual, somente é permitido ao
            Usuário a utilização da propriedade intelectual do Lokkan desde que
            haja o cumprimento e a observância destes Termos.
          </Typography>
        </Stack>
      ),
    },
    {
      title: '10. Uso de recursos de Inteligência Artificial generativa',
      description: (
        <Stack spacing={1}>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            A Lokkan utiliza recursos de Inteligência Artificial generativa em
            sua Plataforma, desenvolvida com tecnologia fornecida pelo Azure
            OpenAI Service, uma parceria entre Microsoft e a OpenAI, com o
            objetivo de oferecer suporte rápido e eficiente aos usuários. Caso
            deseje saber melhor como funciona o Azure OpenAI Service, acesse o
            site.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Dentre as iniciativas da Lokkan que utilizam os recursos e
            inteligência artificial generativa estão os “chatbots”. O chatbot é
            um programa de computador projetado para simular conversas com
            usuários humanos. Ele utiliza tecnologia de Inteligência Artificial
            generativa e processamento de linguagem natural para entender,
            interpretar e responder às perguntas e transações de maneira
            automatizada. Os chatbots estão disponíveis tanto no WhatsApp da
            Lokkan quanto em alguns chats integrados dentro da nossa Plataforma.
            Eles são direcionados para responder perguntas com base em nossa
            Central de Ajuda pública, que inclui as perguntas mais frequentes e
            suas respectivas respostas. O objetivo é fornecer informações
            precisas e úteis para as dúvidas mais comuns.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Caso o chatbot receba uma pergunta que não esteja coberta pelos
            materiais de referência, ele informará que não possui uma resposta
            adequada. Neste caso, você será encaminhado para o atendimento
            humano, garantindo que todas as suas dúvidas sejam atendidas. Ao
            interagir com o chatbot, o usuário é informado de que está se
            comunicando com um sistema de Inteligência Artificial e não com um
            ser humano. A Lokkan não se responsabiliza por erros ou imperícias
            dos resultados das análises dos recursos de Inteligência Artificial
            fornecidos pelo Azure OpenAI Service dentro de sua Plataforma.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Além disso, recomendamos enfaticamente que os Usuários não
            compartilhem dados pessoais durante as interações com nossos
            chatbots. Os chatbots são programados para responder a perguntas
            específicas relacionadas aos serviços e funcionalidades da
            plataforma. Com isso, você ajuda a manter a segurança de seus dados
            e a integridade de nossos sistemas.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Ao utilizar os recursos de Inteligência Artificial gerados em nossa
            plataforma, você se compromete a seguir os Termos e Condições de
            Uso. Qualquer uso indevido, como a manipulação de recursos para
            pessoas específicas não autorizadas, pode resultar em medidas
            judiciais e na suspensão do seu acesso à Plataforma. É essencial
            utilizar estes recursos apenas para os fins previstos, respeitando
            as diretrizes condicionais.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            As interações com os recursos de Inteligência Artificial generativa
            são tratadas com o mesmo rigor em termos de privacidade e segurança
            que todas as outras operações em nossa Plataforma.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            A Lokkan poderá realizar atualizações periódicas nos recursos de
            Inteligência Artificial generativa fornecidos em sua Plataforma para
            melhorar a eficácia e abrangência. Essas atualizações serão sempre
            realizadas para melhorar a experiência do usuário e a qualidade das
            informações fornecidas.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Encorajamos todos os usuários a fornecer feedbacks sobre a
            experiência utilizando os recursos de Inteligência Artificial
            generativa fornecidos dentro de nossa Plataforma. Essas informações
            são valiosas para nós e serão utilizadas para aprimorar ainda mais
            nossos produtos e serviços.
          </Typography>
        </Stack>
      ),
    },
    {
      title: '11. Contato',
      description: (
        <Stack spacing={1}>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            A Lokkan poderá entrar em contato com você por e-mail, Whatsapp, ou
            outros canais que você tenha compartilhado para comunicar questões
            relacionadas à prestação de serviços, oferecer produtos/serviços,
            convidar você para contribuir com pesquisas, entre outros. São
            consideradas válidas as comunicações dos Usuários realizadas por
            escrito e enviadas para o nosso canal de atendimento.
          </Typography>
        </Stack>
      ),
    },
    {
      title: '12. Aceitação',
      description: (
        <Stack spacing={1}>
          <Typography
            variant="h6"
            sx={{
              textIndent: '100px',
            }}
          >
            O Usuário declara estar ciente e de acordo com todos os itens
            mencionados nestes Termos de Uso ao criar a sua conta Lokkan, para
            fins de utilização das plataformas e serviços.
          </Typography>
        </Stack>
      ),
    },
    {
      title: '13. Disposições gerais',
      description: (
        <Stack spacing={1}>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Qualquer condição deste Termo que, por qualquer motivo, venha a ser
            reputada nula ou ineficaz por qualquer juízo ou tribunal, não
            afetará a validade das demais disposições do Termo, as quais serão
            cumpridas válidas e vinculantes, gerando efeitos em sua extensão
            máxima.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            A Lokkan busca, constantemente, melhorar os Termos, seus produtos e
            serviços, tendo o direito de adicionar, remover ou atualizar
            conteúdo, funcionalidades ou softwares. Você será informado por
            e-mails, mensagens pelo aplicativo Whatsapp, notificação instantânea
            (push) ou por outros meios.
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Por isso, antes de usá-los dê uma olhada aqui!
          </Typography>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            Os Termos são regidos pelas leis vigentes na República Federativa do
            Brasil. Para todas as questões relacionadas à interpretação, ao
            cumprimento ou qualquer outro questionamento relacionado a estes
            Termos de Uso, conforme Partes concordam em se submetem ao Foro da
            Comarca de São Paulo/SP, com exceção de reclamações feitas por
            Usuários que se enquadram legalmente como consumidores , que poderá
            submeter tais reclamações ao foro do seu domicílio.
          </Typography>
        </Stack>
      ),
    },
    {
      title: '14. Disposições gerais',
      description: (
        <Stack spacing={1}>
          <Typography
            sx={{
              textIndent: '100px',
            }}
          >
            As Partes declaram que cumprem e continuarão a cumprir, todas as
            leis, regras, acordos e convenções aplicáveis ​​ao presente Termo e
            às suas atividades (conjuntamente designadas como “Legislação
            Anticorrupção”), incluindo, mas não se limitando a: (i) Lei
            Anticorrupção Brasileira (Lei nº 12.846 de agosto de 2013), bem como
            os dispositivos que a regulamentam, como o Decreto nº 11.129 de
            julho de 2022; (ii) uma Lei de Improbidade Administrativa (Lei nº
            8.429 de junho de 1992); (iii) a Lei de Licitações (Lei nº 8.666 de
            junho de 1993 e a Lei 14.133 de abril de 2021); (iv) dos crimes
            contra a administração pública previstos no Código Penal Brasileiro
            (Decreto Lei 2.848 de dezembro de 1940); (v) uma Lei sobre os Crimes
            de Lavagem de Dinheiro (Lei nº 9.613 de março de 1998); e (vi)
            qualquer outra Legislação Anticorrupção aplicável, em especial a lei
            americana contra corrupção no exterior (Foreign Corrupt Practices
            Act ou FCPA).
          </Typography>
        </Stack>
      ),
    },
  ]
  return (
    <div>
      <Head>
        <title>Lokkan</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />{' '}
      </Head>

      <main className="section">
        <Navbar
          shape={false}
          paddingY={'1vh'}
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          handleLoginClose={handleLoginClose}
          handleLoginOpen={handleLoginOpen}
          language="pt"
          myValue="pt"
          colorLogo
        />
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: { xs: '25vh', sm: '25vh', md: '25vh' },
            // width: { xs: "120%", sm: "120%", md: "100%" },
            background: 'linear-gradient(90deg, #20BAF6 0%, #7450F0 100%)',
          }}
        >
          <Box
            sx={{
              position: { lg: 'absolute', xl: 'absolute' },
            }}
          ></Box>
        </Grid>

        <Box
          sx={{
            px: { xs: 2, sm: 2, md: 2, lg: 25, xl: 25 },
            position: { lg: 'relative', xl: 'relative' },
            top: -120,
          }}
        >
          <PrivacyContent name="Termos de uso" contents={contents} />
        </Box>

        <Footer />
      </main>
    </div>
  )
}

export default Terms
