import React from 'react';
import Modal from 'react-modal';

const ModalTermos = ({ isOpen, onRequestClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Termos e Condições"
            style={{
                content: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start', // Alinhamento à esquerda
                    paddingRight: '20px', // Espaçamento à direita para o botão
                }
            }}
        >
            <strong><h2>Termos e Condições de Uso da Secure-Her Digital Library</h2></strong><br/>
            <p>
                <strong>Introdução</strong><br/>
                1.1. Estes Termos e Condições de Uso ("Termos") constituem o contrato entre você e a Secure-Her, governando o acesso e uso da Secure-Her Digital Library ("Secure-Her"), uma plataforma cuidadosamente desenvolvida para proporcionar acesso a uma vasta gama de recursos de leitura, incluindo livros eletrônicos, artigos, documentos e outros materiais relacionados à literatura e ao conhecimento em geral.<br/><br/>

                <strong>Descrição da Aplicação</strong><br/>
                2.1. A Secure-Her é mais do que uma simples plataforma de leitura; é um portal para o mundo do conhecimento, projetado para enriquecer mentes ávidas por aprender e explorar novas ideias. Nossa extensa biblioteca digital oferece uma variedade impressionante de recursos de leitura, abrangendo diversos gêneros, temas e perspectivas, tudo ao alcance de seus dedos.<br/><br/>

                <strong>Uso da Aplicação</strong><br/>
                3.1. Ao fazer uso da Secure-Her, você concorda em fazê-lo estritamente para fins legais e em conformidade com estes Termos. Comprometemo-nos a proporcionar uma experiência segura e respeitosa para todos os usuários, e esperamos que você utilize a Secure-Her de maneira ética e responsável.<br/><br/>

                <strong>Conta de Usuário</strong><br/>
                4.1. Para acessar determinadas funcionalidades da Secure-Her, pode ser necessário criar uma conta de usuário. A segurança de suas credenciais de login é de extrema importância, e você é responsável por protegê-las contra uso não autorizado. Todas as atividades realizadas em sua conta são de sua responsabilidade.<br/><br/>

                <strong>Propriedade Intelectual</strong><br/>
                5.1. Reconhecemos e valorizamos os direitos de propriedade intelectual associados à Secure-Her, incluindo direitos autorais, marcas registradas e direitos de banco de dados. Você concorda em respeitar esses direitos e em não utilizar a Secure-Her de maneira que viole tais direitos.<br/><br/>

                <strong>Conteúdo do Usuário</strong><br/>
                6.1. Como parte de sua experiência na Secure-Her, você pode ter a oportunidade de enviar, postar ou compartilhar conteúdo. Ao fazer isso, você concede à Secure-Her uma licença mundial, não exclusiva, transferível, sublicenciável e isenta de royalties para utilizar, reproduzir, modificar, adaptar, publicar, traduzir, distribuir e exibir esse conteúdo, conforme necessário para operar e promover a Secure-Her.<br/><br/>

                <strong>Privacidade</strong><br/>
                7.1. Comprometemo-nos a proteger sua privacidade e suas informações pessoais. Nossa Política de Privacidade detalha como coletamos, usamos e protegemos suas informações ao utilizar a Secure-Her. Recomendamos fortemente que você revise nossa Política de Privacidade para entender completamente nossas práticas.<br/><br/>

                <strong>Modificações nos Termos</strong><br/>
                8.1. Periodicamente, podemos revisar e atualizar estes Termos para refletir mudanças em nossos serviços ou exigências legais. Quaisquer alterações entrarão em vigor imediatamente após sua publicação na Secure-Her. Ao continuar a acessar ou usar a Secure-Her após tais alterações, você concorda em ficar vinculado aos Termos revisados.<br/><br/>

                <strong>Rescisão</strong><br/>
                9.1. Reservamo-nos o direito de rescindir ou suspender seu acesso à Secure-Her a qualquer momento, sem aviso prévio, por qualquer motivo ou sem motivo, a critério exclusivo da Secure-Her. Você pode encerrar seu uso da Secure-Her a qualquer momento, descontinuando o acesso à plataforma.<br/><br/>

                <strong>Limitação de Responsabilidade</strong><br/>
                10.1. Na medida máxima permitida por lei, a Secure-Her não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais, consequentes ou punitivos decorrentes do uso ou incapacidade de usar a Secure-Her. Estes incluem, mas não se limitam a, perda de lucros, interrupção de negócios ou perda de dados.<br/><br/>

                <strong>Lei Aplicável e Jurisdição</strong><br/>
                11.1. Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, no estado de São Paulo. Qualquer disputa decorrente destes Termos estará sujeita à jurisdição exclusiva dos tribunais localizados em Santos, São Paulo.<br/><br/>

                <strong>Contato</strong><br/>
                12.1. Se você tiver alguma dúvida sobre estes Termos ou sobre a Secure-Her em geral, entre em contato conosco através do nosso site em www.secure-her-assessments.com. Estamos aqui para ajudar e valorizamos seu feedback.<br/><br/>

                Agradecemos sua atenção aos detalhes e seu compromisso em compreender e respeitar estes Termos e Condições de Uso. Juntos, estamos construindo uma comunidade de aprendizado vibrante e inclusiva na Secure-Her Digital Library. Seja bem-vindo e aproveite sua jornada!
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px', width: '100%' }}>
                <button onClick={onRequestClose} style={{ cursor: 'pointer', backgroundColor: '#FFD6D6', border: 'none', padding: '4px', borderRadius: '5px' }}>Fechar</button>
            </div>
        </Modal>
    );
};

export default ModalTermos;