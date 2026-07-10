"use client";

import { motion } from "framer-motion";

export function PrivacyContent() {
  return (
    <div className="mx-auto w-full max-w-4xl px-margin-mobile py-stack-lg md:px-margin-desktop">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-8 font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary md:text-headline-lg">
          Política de Privacidade
        </h1>

        <div className="space-y-6 font-body-md text-body-md leading-relaxed text-on-surface-variant">
          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">1. Introdução</h2>
            <p>
              A sua privacidade é importante para nós. Esta Política de Privacidade descreve como o
              Rádio Coringão coleta, usa, armazena e protege as informações dos seus usuários.
              Ao acessar nosso portal, você concorda com as práticas descritas neste documento.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">2. Informações Coletadas</h2>
            <p className="mb-2">
              Podemos coletar os seguintes tipos de informações quando você interage com o nosso site:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Dados de cadastro:</strong> nome, e-mail e senha quando você cria uma conta
                para comentar ou participar de funcionalidades exclusivas.
              </li>
              <li>
                <strong>Dados de navegação:</strong> endereço IP, tipo de navegador, sistema
                operacional, páginas visitadas e tempo de permanência no site.
              </li>
              <li>
                <strong>Cookies:</strong> pequenos arquivos armazenados no seu dispositivo para
                melhorar sua experiência de navegação e lembrar suas preferências.
              </li>
              <li>
                <strong>Informações fornecidas voluntariamente:</strong> dados enviados em
                formulários de contato, inscrições em newsletters ou participações em enquetes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">3. Uso das Informações</h2>
            <p className="mb-2">As informações coletadas são utilizadas para:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Personalizar sua experiência de navegação no site.</li>
              <li>Enviar newsletters e comunicações sobre novidades do Corinthians e do Rádio Coringão.</li>
              <li>Responder a suas dúvidas, sugestões e solicitações de contato.</li>
              <li>Melhorar continuamente nosso conteúdo e funcionalidades.</li>
              <li>Gerar estatísticas de acesso para aprimorar o desempenho do site.</li>
              <li>Garantir a segurança e prevenir fraudes ou usos indevidos da plataforma.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">4. Compartilhamento de Dados</h2>
            <p>
              O Rádio Coringão não vende, aluga ou compartilha suas informações pessoais com
              terceiros para fins comerciais. Seus dados podem ser compartilhados apenas nas
              seguintes situações:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                Quando exigido por lei ou por determinação judicial.
              </li>
              <li>
                Para proteger os direitos, a segurança ou a propriedade do Rádio Coringão e
                de seus usuários.
              </li>
              <li>
                Com prestadores de serviços que nos auxiliam na operação do site (hospedagem,
                analytics, envio de e-mails), sempre sob contrato de confidencialidade.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">5. Cookies e Tecnologias de Rastreamento</h2>
            <p className="mb-2">
              Utilizamos cookies para melhorar sua experiência. Os cookies podem ser:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Essenciais:</strong> necessários para o funcionamento básico do site
                (login, preferências de idioma).
              </li>
              <li>
                <strong>Analíticos:</strong> coletam dados anônimos sobre como os usuários
                utilizam o site, nos ajudando a identificar áreas de melhoria.
              </li>
              <li>
                <strong>De marketing:</strong> utilizados para exibir conteúdo relevante e
                personalizado, com base nos seus interesses.
              </li>
            </ul>
            <p className="mt-2">
              Você pode gerenciar suas preferências de cookies nas configurações do seu navegador.
              A desativação de certos cookies pode afetar a funcionalidade do site.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">6. Segurança dos Dados</h2>
            <p>
              Adotamos medidas técnicas e organizacionais para proteger suas informações contra
              acesso não autorizado, alteração, divulgação ou destruição. Entre as medidas estão:
              criptografia de dados sensíveis, acesso restrito a informações pessoais e monitoramento
              regular de nossos sistemas. No entanto, nenhum método de transmissão pela internet
              é 100% seguro, e não podemos garantir segurança absoluta.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">7. Seus Direitos (LGPD)</h2>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018),
              você tem os seguintes direitos:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Acesso:</strong> solicitar cópia dos seus dados pessoais armazenados.
              </li>
              <li>
                <strong>Correção:</strong> solicitar a correção de dados incompletos ou desatualizados.
              </li>
              <li>
                <strong>Exclusão:</strong> solicitar a remoção dos seus dados pessoais.
              </li>
              <li>
                <strong>Portabilidade:</strong> solicitar a transferência dos seus dados para
                outro serviço.
              </li>
              <li>
                <strong>Oposição:</strong> se opor ao tratamento dos seus dados para fins
                específicos.
              </li>
              <li>
                <strong>Revogação do consentimento:</strong> a qualquer momento, você pode
                revogar o consentimento para o uso dos seus dados.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">8. Retenção de Dados</h2>
            <p>
              Suas informações pessoais são mantidas pelo tempo necessário para cumprir as finalidades
              para as quais foram coletadas, salvo quando um período mais longo for exigido ou
              permitido por lei. Dados de navegação anonimizados podem ser retidos para fins
              estatísticos por tempo indeterminado.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">9. Links para Sites de Terceiros</h2>
            <p>
              Nosso portal pode conter links para outros sites. Esta Política de Privacidade
              aplica-se exclusivamente ao Rádio Coringão. Recomendamos que você leia as políticas
              de privacidade dos sites de terceiros antes de fornecer qualquer informação pessoal.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">10. Crianças e Adolescentes</h2>
            <p>
              O Rádio Coringão não coleta intencionalmente informações de crianças menores de 13
              anos. Se descobrirmos que coletamos dados de uma criança sem o consentimento dos
              pais ou responsáveis, tomaremos providências imediatas para excluí-los.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">11. Alterações nesta Política</h2>
            <p>
              O Rádio Coringão reserva-se o direito de atualizar esta Política de Privacidade
              a qualquer momento. As alterações serão publicadas nesta página com a data da
              última atualização. Recomendamos que você revise periodicamente este documento
              para se manter informado sobre como protegemos suas informações.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">12. Contato</h2>
            <p>
              Se você tiver dúvidas, sugestões ou solicitações relacionadas a esta Política de
              Privacidade ou ao tratamento dos seus dados pessoais, entre em contato conosco:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>E-mail:</strong> radioncoringaocontato@gmail.com
              </li>
              <li>
                <strong>Telefone:</strong> (11) 99999-9999
              </li>
            </ul>
          </section>
        </div>

        <p className="mt-8 text-[12px] text-on-surface-variant">
          Última atualização: Julho de 2026.
        </p>
      </motion.div>
    </div>
  );
}
