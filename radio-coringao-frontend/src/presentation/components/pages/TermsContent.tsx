"use client";

import { motion } from "framer-motion";

export function TermsContent() {
  return (
    <div className="mx-auto w-full max-w-4xl px-margin-mobile py-stack-lg md:px-margin-desktop">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-8 font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary md:text-headline-lg">
          Termos de Uso
        </h1>

        <div className="space-y-6 font-body-md text-body-md leading-relaxed text-on-surface-variant">
          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar o portal Rádio Coringão, você concorda com estes Termos de Uso.
              Caso não concorde com algum dos termos aqui apresentados, solicitamos que não utilize o site.
              O uso continuado do site após eventuais alterações nestes termos constitui aceitação das mudanças.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">2. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo publicado no Rádio Coringão, incluindo textos, imagens, vídeos, logotipos e
              design, é protegido por direitos autorais. É proibida a reprodução, distribuição ou modificação
              do conteúdo sem autorização prévia da redação.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">3. Uso do Conteúdo</h2>
            <p>
              Os usuários podem compartilhar notícias do Rádio Coringão em redes sociais e plataformas
              de mensagem, desde que creditem a fonte com link direto para a página original. O uso
              comercial do conteúdo requer autorização expressa.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">4. Comentários e Interações</h2>
            <p>
              Ao comentar em notícias ou interagir no site, o usuário compromete-se a manter um
              linguajar respeitoso. Comentários com ofensas, discriminatórios ou ilegais serão removidos
              sem aviso prévio. O Rádio Coringão reserva-se o direito de banir usuários que violem
              estas regras.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">5. Links Externos</h2>
            <p>
              O site pode conter links para sites de terceiros. O Rádio Coringão não se responsabiliza
              pelo conteúdo, políticas de privacidade ou práticas de sites externos. Recomendamos que
              os usuários leiam os termos de uso de cada site visitado.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">6. Isenção de Responsabilidade</h2>
            <p>
              As informações publicadas no Rádio Coringão são verificadas pela nossa equipe editorial,
              mas não garantimos a precisão absoluta de dados estatísticos, placares ao vivo ou
              informações de mercado. O conteúdo é produzido com base em fontes confiáveis, mas
              pode conter imprecisões.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">7. Alterações nos Termos</h2>
            <p>
              O Rádio Coringão reserva-se o direito de alterar estes Termos de Uso a qualquer momento.
              As alterações entrarão em vigor imediatamente após a publicação no site. Recomendamos
              que os usuários revisem periodicamente esta página.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline-md text-headline-md text-primary">8. Contato</h2>
            <p>
              Em caso de dúvidas sobre estes Termos de Uso, entre em contato conosco pelo e-mail
              <strong> radioncoringaocontato@gmail.com</strong>.
            </p>
          </section>
        </div>

        <p className="mt-8 text-[12px] text-on-surface-variant">
          Última atualização: Janeiro de 2026.
        </p>
      </motion.div>
    </div>
  );
}
