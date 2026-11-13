 /* --------------------------------------------------------------------------
           A. BASE DE DATOS DE CONTENIDO DINÁMICO (SECTORES Y MODALES)
           -------------------------------------------------------------------------- */
        const sectorData = {
            alimentacao: {
                title: 'Cardápios Digitais & Atendimento Direto',
                desc: 'Estruturação de páginas de apresentação e catálogos integrados ao WhatsApp para simplificar pedidos e reduzir intermediações.',
                bullets: ['Cardápio Rápido', 'Direcionamento WhatsApp', 'Layout Responsivo']
            },
            estetica: {
                title: 'Páginas para Clínicas & Salões',
                desc: 'Layouts profissionais para destacar seus procedimentos, galeria de trabalhos e atalhos rápidos para agendamento.',
                bullets: ['Exibição de Serviços', 'Acesso Fácil a Agendamentos', 'Design Elegante']
            },
            pet: {
                title: 'Plataformas para Petshops & Clínicas',
                desc: 'Páginas leves para organizar planos de saúde animal, banho/tosa e informações essenciais de atendimento.',
                bullets: ['Localização Fácil', 'Serviços em Destaque', 'Navegação Simples']
            },
            comercio: {
                title: 'Catálogos Web para Lojas',
                desc: 'Apresentação de produtos em interface limpa e rápida para facilitar o contato de compradores via WhatsApp.',
                bullets: ['Catálogo Organizado', 'Foco no Cliente', 'Carregamento Rápido']
            }
        };

        const modalDataDetails = {
            pme: {
                icon: '<i class="fa-solid fa-store" style="color: var(--accent-indigo-light); font-size: 1.75rem;"></i>',
                title: 'Pequenas e Médias Empresas',
                body: '<p><b>Foco:</b> Fortalecimento da marca e captação de clientes.</p><p>Desenvolvimento de páginas com foco em usabilidade e navegação intuitiva. Facilito o acesso às informações para que seus clientes encontrem o que procuram de maneira clara e profissional.</p>'
            },
            corp: {
                icon: '<i class="fa-solid fa-building" style="color: var(--accent-indigo-light); font-size: 1.75rem;"></i>',
                title: 'Soluções Corporativas',
                body: '<p><b>Foco:</b> Credibilidade, estabilidade e segurança.</p><p>Sites institucionais desenvolvidos com atenção aos detalhes, boas práticas de programação e compatibilidade com os principais padrões da web.</p>'
            },
            ia: {
                icon: '<i class="fa-solid fa-gears" style="color: var(--accent-indigo-light); font-size: 1.75rem;"></i>',
                title: 'Automação & Atendimento',
                body: '<p><b>Foco:</b> Agilidade comercial.</p><p>Integração de formulários inteligentes, direcionamento para WhatsApp e assistentes de apoio que respondem dúvidas frequentes sem deixar seu cliente esperando.</p>'
            },
            proj1: {
                icon: '<i class="fa-solid fa-laptop-code" style="color: var(--accent-indigo-light); font-size: 1.75rem;"></i>',
                title: 'Exemplo: Estrutura Web Profissional',
                body: '<p><b>Estrutura:</b> Design moderno, responsivo e adaptado para conversão.</p><p>Uma demonstração prática de como a estrutura visual e os conteúdos organizados ajudam a reter a atenção do cliente e facilitam a jornada até o orçamento.</p>'
            },
            proj2: {
                icon: '<i class="fa-solid fa-robot" style="color: #34d399; font-size: 1.75rem;"></i>',
                title: 'Exemplo: Agente de IA para Atendimento',
                body: '<p><b>Funcionalidade:</b> IA integrada para suporte comercial 24/7.</p><p>Demonstração de como um robô inteligente atende seu cliente instantaneamente no WhatsApp, coleta dados relevantes e reduz drasticamente o tempo de espera.</p>'
            }
        };

        /* --------------------------------------------------------------------------
           B. FUNCIÓN PARA CAMBIAR DE PESTAÑA EN LA SECCIÓN DE SECTORES
           -------------------------------------------------------------------------- */
        function switchSector(key, button) {
            const data = sectorData[key];
            if (!data) return;

            // Actualiza el estado visual activo de los botones
            if (button) {
                document.querySelectorAll('.sector-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
            }

            // Aplica una transición suave de opacidad e inyecta el nuevo contenido
            const container = document.getElementById('sectorContent');
            container.style.opacity = 0;

            setTimeout(() => {
                const bulletsHtml = data.bullets.map(b => `
                    <div class="bullet-item">
                        <i class="fa-regular fa-circle-check" style="color: var(--accent-indigo-light);"></i>
                        <span>${b}</span>
                    </div>
                `).join('');

                container.innerHTML = `
                    <div class="sector-inner-grid">
                        <div>
                            <h3 style="font-size: 1.25rem; font-weight: 700; color: #ffffff; margin-bottom: 0.5rem;">${data.title}</h3>
                            <p style="color: var(--text-muted); font-size: 0.9rem;">${data.desc}</p>
                        </div>
                        <div class="sector-bullets">
                            ${bulletsHtml}
                        </div>
                    </div>
                `;
                container.style.opacity = 1;
            }, 150);
        }

        // Inicializa la primera pestaña al cargar la página
        switchSector('alimentacao', document.querySelector('.sector-btn'));

        /* --------------------------------------------------------------------------
           C. CONTROL DE VENTANAS MODALES (ABRIR Y CERRAR)
           -------------------------------------------------------------------------- */
        function openModal(key) {
            const data = modalDataDetails[key];
            if (!data) return;

            document.getElementById('modalHeader').innerHTML = data.icon;
            document.getElementById('modalTitle').innerText = data.title;
            document.getElementById('modalBody').innerHTML = data.body;

            document.getElementById('infoModal').classList.add('open');
        }

        function closeModal() {
            document.getElementById('infoModal').classList.remove('open');
        }

        function openAboutModal() {
            document.getElementById('aboutModal').classList.add('open');
        }

        function closeAboutModal() {
            document.getElementById('aboutModal').classList.remove('open');
        }

        // Permite cerrar cualquier modal haciendo clic fuera de la caja central
        function closeModalOnBackdrop(event, modalId) {
            if (event.target.id === modalId) {
                document.getElementById(modalId).classList.remove('open');
            }
        }

        // Permite cerrar modales presionando la tecla Escape (ESC)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
                closeAboutModal();
            }
        });

        /* --------------------------------------------------------------------------
           D. ANIMACIONES DE APARICIÓN AL HACER SCROLL (INTERSECTION OBSERVER)
           Reemplaza la librería externa AOS usando la API nativa del navegador.
           -------------------------------------------------------------------------- */
        const observerOptions = {
            threshold: 0.15 // Se activa cuando el 15% del elemento es visible
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Solo se anima una vez
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => scrollObserver.observe(el));

        /* --------------------------------------------------------------------------
           E. EFECTO DE CAMPO DE ESTRELLAS EN EL FONDO (HTML5 CANVAS)
           Genera partículas en perspectiva 3D que viajan hacia la pantalla.
           -------------------------------------------------------------------------- */
        const canvas = document.getElementById('starsCanvas');
        const ctx = canvas.getContext('2d');

        let stars = [];
        const numStars = 100;
        const maxDepth = 1000;

        // Ajusta el tamaño del lienzo al tamaño actual de la ventana
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        }

        // Clase que representa cada estrella individual
        class Star {
            constructor() {
                this.reset();
                this.z = Math.random() * maxDepth;
            }

            reset() {
                this.x = (Math.random() - 0.5) * canvas.width * 2;
                this.y = (Math.random() - 0.5) * canvas.height * 2;
                this.z = maxDepth;
                this.speedZ = Math.random() * 1.4 + 0.2;
                this.baseOpacity = Math.random() * 1.8 + 5.2;
            }

            update() {
                this.z -= this.speedZ;
                if (this.z <= 0) {
                    this.reset();
                }
            }

            draw() {
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const fov = 350; // Campo de visión

                // Proyección 3D a coordenadas 2D de pantalla
                const screenX = (this.x / this.z) * fov + centerX;
                const screenY = (this.y / this.z) * fov + centerY;
                const size = (1 - this.z / maxDepth) * 1.5 + 0.2;

                // Evita dibujar estrellas fuera de los límites visibles
                if (screenX < 0 || screenX > canvas.width || screenY < 0 || screenY > canvas.height) {
                    return;
                }

                ctx.beginPath();
                ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(165, 180, 252, ${this.baseOpacity})`;
                ctx.fill();
            }
        }

        function initStars() {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push(new Star());
            }
        }

        // Bucle principal de animación a 60 FPS
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < stars.length; i++) {
                stars[i].update();
                stars[i].draw();
            }
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();