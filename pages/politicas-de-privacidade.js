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

function PoliticasDePrivacidade({
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
}) {
  const contents = [
    {
      title: ' 1. Introdução',
      description: `Nós estamos comprometidos com a segurança de seus Dados Pessoais e
      com sua privacidade durante toda a sua jornada dentro do Lokkan,
      desde quando você realiza o cadastro em nossa plataforma até o
      suporte quando você se torna nosso cliente! O tratamento de seus
      dados pessoais é uma condição necessária para que possamos prestar a
      você nossos serviços e continuar utilizando esta plataforma, você
      está ciente e concorda com o tratamento de seus dados pessoais de
      acordo e nos termos desta Política de Privacidade ("Política") .
      Você, ao aceitar os termos desta Política, concorda expressamente em
      fornecer apenas dados pessoais verdadeiros, atuais e precisos na
      utilização de nossos produtos ou serviços. Você será responsável por
      danos, diretos ou indiretos, que causem ou forneçam dados falsos à
      Lokkan ou a terceiros.`,
    },
    {
      title: '2. A quem se aplica',
      description: `Esta Política se aplica a todos os Usuários do Lokkan. O acesso ou
      uso das plataformas Lokkan por menores de 18 anos não emancipados é
      expressamente proibido e ao utilizar um Lokkan você garante que é
      maior e capaz de exercer pessoalmente os atos da vida civil.`,
    },
    {
      title: '3. Quais dados coletamos?',
      description: (
        <Stack direction={'column'} spacing={2}>
          <Typography>
            A Lei Geral de Proteção de Dados Pessoais (“LGPD”) considera dados
            pessoais aqueles que identificam ou tornam uma pessoa identificável.
            Nós coletamos os dados pessoais necessários para prestar nossos
            serviços e oferecer produtos a você. Para isso coletamos: Dados de
            identificação
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            São os dados que identificam você como seu nome completo, e-mail,
            telefone, endereço, CEP, CPF, RG, dados de nascimento e senha. Dados
            de navegação
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            São os dados gerados através do uso de nossas plataformas, como:
            endereço IP, provedor de navegação, conexão de rede, cookies, dados
            de geolocalização quando autorizados em seu dispositivo, sistema
            operacional de seu dispositivo, desempenho do dispositivo, da rede e
            do dispositivo, serviços acessados, interações realizadas e ID do
            seu dispositivo. Dados de terceiros
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            São os dados que podemos obter através de fontes públicas,
            relatórios de serviços ou de nossos parceiros, sempre de acordo com
            a legislação brasileira, por exemplo: seu histórico de crédito,
            gerado por agências de crédito, restrições financeiras, dados
            necessários para viabilizar operações financeiras, realizar a
            complementação de dados informados e atender às suas demandas. Você
            pode consultar as Políticas de Privacidade de terceiros com as quais
            interagem nos próprios sites desses. Dados biométricos
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            São os dados necessários para garantir a validação de sua identidade
            e evitar que não ocorram fraudes em seu nome, por exemplo: a selfie
            que pedimos que você tire junto ao seu documento oficial para
            certificarmos sua identidade. Os dados biométricos são considerados
            dados sensíveis e quando formos realizados o tratamento desses dados
            avisaremos você.
          </Typography>
        </Stack>
      ),
    },
    {
      title: '4. Para que utilizamos seus dados?',
      description: (
        <Stack direction={'column'} spacing={2}>
          <Typography sx={{ fontWeight: 600 }}>
            Dados pessoais que você nos informa ao criar uma conta no Lokkan:
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para identificar e autenticar você especificamente em nossas
            plataformas.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para manter seu cadastro atualizado e entrar em contato com você por
            telefone, e-mail, WhatsApp ou outros meios de comunicação.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para cumprir os termos e condições desta Política bem como os Termos
            de Uso de nossos produtos e serviços.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para atender às suas solicitações e dúvidas em nossos canais de
            atendimento.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para informá-lo sobre as novidades, novas funcionalidades,
            conteúdos, novidades e demais eventos relevantes do Lokkan.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para enviar mensagens sobre nossos produtos ou serviços que possam
            ser do seu interesse. - Para conhecer você, inovando, melhorando e
            desenvolvendo nossos produtos.
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            Os dados pessoais decorrentes de sua navegação nas nossas
            plataformas:
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para melhorar cada vez mais a sua experiência de uso em nossas
            plataformas.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para produzirmos estatísticas, estudos, pesquisas e levantamentos
            protegidos e necessários para oferecer a você nossos serviços, sendo
            que, sempre que possível, seus dados serão anonimizados para esses
            especificamente.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para exibir publicidade a você em nossas plataformas ou em sites de
            terceiros. - Para personalizar os conteúdos e a publicidade que
            mostramos em nossas plataformas.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para recomendar a você nossos serviços e produtos, incluindo
            serviços de terceiros que possam ser do seu interesse.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para criar um perfil sobre você, personalizando sua experiência em
            nossos serviços.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para monitorar atividades e tendências de uso.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para mensurar interações e audiência dos Serviços.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para considerar e acompanhar sua navegação.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para cumprir obrigações legais ou regulamentares, bem como exercer
            direitos em processos judiciais, administrativos ou arbitrais.
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            Dados pessoais necessários para a prestação de nossos serviços e
            oferecer produtos:
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para confirmar e completar os seus dados, conforme a relação
            estabelecida com você.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para prevenir fraudes e garantir a você segurança na prestação de
            nossos serviços e no fornecimento de nossos produtos.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para execução dos contratos ou para procedimentos pré-contratuais.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para atender suas demandas relacionadas à execução de nossos
            produtos ou serviços.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para cumprir obrigações legais ou regulamentares, bem como, exercer
            direitos em processos judiciais, administrativos ou arbitrais.
          </Typography>
          <Typography>Dados pessoais informados por terceiros:</Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para prevenir fraudes e garantir a você segurança na prestação de
            nossos serviços e no fornecimento de nossos produtos.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para promover a proteção ao crédito.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para que a complementação de dados facilite seu cadastro e melhore
            sua experiência em nossos produtos e serviços.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para prevenir problemas técnicos ou de segurança.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para proteger nossos direitos e propriedades, inclusive de invasões
            e incidentes de segurança.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para suporte técnico e operacional e garantir a funcionalidade dos
            nossos serviços.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para oferecer nossos serviços e produtos, bem como os de nossos
            parceiros.
          </Typography>
          <Typography sx={{ textIndent: '50px' }}>
            Para viabilizar transações financeiras.
          </Typography>
        </Stack>
      ),
    },
    {
      title: '5. Como quem seus dados podem ser compartilhados?',
      description: (
        <Stack direction={'column'} spacing={2}>
          <Typography>
            A Lokkan poderá compartilhar seus dados com terceiros que possuam
            padrões de segurança e confidencialidade adequados e aptos para
            proteger seus dados. Entre esses terceiros estão: Parceiros de
            negócio: podemos compartilhar seus dados com nossos parceiros para
            oferecer serviços a você, ampliar e desenvolver nossos negócios.
            Prestadores de serviços de marketing: utilizamos serviços de
            marketing para oferecer a você anúncios que sejam do seu interesse,
            envio de e-mail marketing, telemarketing, mensagens pelo aplicativo
            WhatsApp, notificação instantânea de push, entre outros canais de
            comunicação. Prestadores de serviços de tecnologia: podemos
            compartilhar seus dados para aprimorar nossas plataformas, armazenar
            dados e obter suporte técnico e operacional aos nossos serviços.
            Agências de crédito, provedores de meios de pagamento, integradores
            de meios de pagamento e empresas de cartões de crédito: utilizam
            esses serviços para pagamentos realizados em decorrência do uso de
            nossos serviços ou produtos, cumprem as obrigações contratuais,
            evitam atividades ilegais, suspeitas ou produtos. produtos
            fraudulentos, garantir a prevenção à fraude e a segurança dos nossos
            usuários. Autoridades Governamentais: seus dados poderão ser
            compartilhados para cumprir obrigações legais ou regulatórias, para
            execução de contratos, para o exercício de direitos em processos
            judiciais, administrativos ou arbitrais e para garantir a prevenção
            à fraude. Você: para garantir o atendimento aos seus requisitos e
            nossa transparência sobre como tratamos seus dados pessoais.
          </Typography>
        </Stack>
      ),
    },
    {
      title: '6. Seus direitos (e como exercê-los!)',
      description: (
        <Stack direction={'column'} spacing={2}>
          <Typography>
            Confirmação de tratamento: Você pode solicitar ao Lokkan a
            confirmação do tratamento de seus dados pessoais. Acesso aos dados:
            Você pode solicitar ao Lokkan o acesso aos dados pessoais que
            possuímos relacionados a você. Correção de dados pessoais: Você pode
            solicitar ao Lokkan a correção de dados que estejam incompletos,
            inexatos ou desatualizados, podendo corrigi-los ou complementá-los.
            Para realizar a correção será necessário que você apresente um
            documento comprovando a veracidade dos novos dados informados.
            Anonimização, bloqueio ou eliminação: Caso seus dados sejam tratados
            de forma incidental, em excesso para a finalidade específica do
            tratamento ou em desconformidade com as disposições da LGPD, você
            poderá solicitar que a Lokkan realize a anonimização, bloqueio ou
            eliminação de dados. Para isso, deverá restabelecer a investigação
            do fato de que houve excesso, ausência de necessidade ou
            desconformidade com a LGPD nas atividades de tratamento da Lokkan. A
            eliminação de dados essenciais para o uso da plataforma implicará
            nenhum término de seu cadastro junto ao Lokkan. Eliminação dos dados
            tratados com consentimento: Você pode solicitar a eliminação dos
            dados tratados com base no seu consentimento, sendo que esses serão
            excluídos desde que não sejam necessários para a prestação de nossos
            serviços ou para o cumprimento de obrigações legais ou regulatórias.
            Informações sobre o compartilhamento: Você pode solicitar ao Lokkan
            informações de entidades públicas e privadas como o compartilhamento
            de seus dados foi realizado. Informações sobre a possibilidade de
            não fornecer o consentimento e sobre as consequências da negativa:
            Caso seja necessário o seu consentimento para acessar determinado
            produto ou serviço da Lokkan, você pode nos solicitar informações
            sobre a possibilidade de não fornecer o consentimento e quais são as
            negativas resultantes desta ação. Revogação do consentimento: Caso
            você tenha fornecido sua autorização para o tratamento de dados,
            você poderá revogá-lo a qualquer tempo. Destacamos que isso não quer
            dizer que não podemos mais tratar os seus dados, estes poderão ser
            tratados de forma anonimizada ou com base em outras hipóteses
            autorizadas legais que respalde o tratamento. Decisões
            automatizadas: Você pode solicitar uma revisão de decisões tomadas
            unicamente com base no tratamento automatizado de dados e uma
            indicação dos critérios utilizados nessas decisões, observados
            sempre os segredos comerciais e industriais da Lokkan. Portabilidade
            de dados: Após a regulamentação desse direito pela Autoridade
            competente segundo a LGPD, você poderá solicitar a portabilidade de
            seus dados pessoais a outro fornecedor de serviço ou produto. Caso
            você queira exercer alguns dos direitos acima expostos, entre em
            contato conosco através do nossocanal .
          </Typography>
          <Typography>
            Estamos sempre à disposição para esclarecer suas dúvidas e colocar
            você no controle de seus dados pessoais.
          </Typography>
        </Stack>
      ),
    },
    {
      title: '7. Por quanto tempo guardamos seus dados?',
      description: (
        <Stack direction={'column'} spacing={2}>
          <Typography>
            Guardamos os seus dados pelo período necessário para determinar as
            finalidades pelas quais foram sorteadas, cumprir as obrigações
            legais ou regulamentares e exercer direitos em processos judiciais,
            administrativos ou arbitrais. Caso o Lokkan não tenha a necessidade
            de manter seus dados armazenados, eles serão objeto de anonimização
            ou exclusão.
          </Typography>
        </Stack>
      ),
    },
    {
      title: ' 8. Segurança dos dados',
      description: (
        <Stack direction={'column'} spacing={2}>
          <Typography>
            Adotamos medidas técnicas e organizacionais para proteger seus dados
            da forma mais completa possível. Além do compromisso de nossos
            colaboradores com o sigilo e a seleção criteriosa e o monitoramento
            de nossas questões de serviço, também garantimos a proteção de seus
            dados por meio da implementação de procedimentos físicos,
            eletrônicos e administrativos adequados para manter-los seguros aqui
            na Lokkan. Além disso, sempre que possível, seus dados serão
            tratados de forma anônima, o que quer dizer que não será possível
            identificá-lo no conjunto de dados que estamos tratando.
          </Typography>
        </Stack>
      ),
    },
    {
      title: '9. Transferência Internacional de Dados',
      description: (
        <Stack direction={'column'} spacing={2}>
          <Typography>
            Alguns dos dados pessoais que coletamos, ou todos eles, poderão ser
            objeto de transferência internacional, por exemplo, para o
            compartilhamento entre as empresas do grupo econômico da Lokkan e
            para o armazenamento em servidores de computação em nuvens
            localizadas fora do Brasil. A Lokkan observa todas as diretrizes
            previstas pela legislação e adota as melhores práticas de segurança
            e privacidade para garantir a integridade e confidencialidade de
            seus dados pessoais.
          </Typography>
        </Stack>
      ),
    },
    {
      title: '10. Entre em contato conosco',
      description: (
        <Stack direction={'column'} spacing={2}>
          <Typography>
            Nós somos o controlador dos dados pessoais que tratamos, de acordo
            com a LGPD, somos identificados como: Lokkan Soluções Imobiliárias
            LTDA. Entre em contato conosco através do nosso canal de
            atendimento. Estamos sempre à disposição para esclarecer suas
            dúvidas, aceitar comentários ou reclamações. 11. Mudanças em nossa
            Política de Privacidade
          </Typography>
          <Typography>
            Buscamos melhorar constantemente nossa política e aprimorar nossos
            produtos e serviços para você, essas mudanças poderão ser refletidas
            nesta página. Por isso, antes de usar nossos serviços dê sempre uma
            olhadinha aqui! Nós avisaremos você sobre as alterações que
            fizermos, seja através do envio de e-mail, mensagem pelo aplicativo
            Whatsapp, notificação instantânea (push) ou por outros meios.
            Atente-se aos dados da última alteração desta Política. Isso implica
            que você esteja ciente e tenha conhecimento dos termos aqui
            oferecidos.
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
        <link rel="icon" href="/negotiate.png" />
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
          <PrivacyContent name="Politicas de privacidade" contents={contents} />
        </Box>

        <Footer />
      </main>
    </div>
  )
}

export default PoliticasDePrivacidade
