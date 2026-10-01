# Continuidade de desenvolvimento entre executores

Data de adopção: 30/09/2026.

## Decisão

Git e GitHub são o mecanismo canónico de continuidade do código. Cada executor autorizado mantém um clone independente. Um checkpoint de desenvolvimento só é considerado salvaguardado quando existe no remoto e o SHA remoto foi confirmado.

GitHub é a fonte técnica do código e das decisões de desenvolvimento. Não substitui requisitos aprovados, Figma, decisões funcionais ou outras fontes de verdade do projecto.

## Modelo operacional

1. Cada executor trabalha num clone ou worktree próprio.
2. Trabalho sequencial pode continuar na mesma branch, com um único escritor de cada vez.
3. Trabalho simultâneo usa branches distintas e integração por PR.
4. Antes de editar, o executor faz fetch e confirma branch, HEAD e working tree.
5. O fecho de um bloco inclui validações adequadas, commit pequeno, push normal e confirmação do SHA remoto.
6. Force push e reescrita de checkpoints publicados não fazem parte do fluxo normal.
7. `main` é reservada à integração controlada. Publicação/deploy é uma decisão separada.

## Estados de um checkpoint

* Preparado: plano ou patch com base identificada.
* Commit local: existe SHA e validação local.
* Sincronizado: o SHA remoto foi confirmado.
* Recuperável: um segundo clone recuperou o checkpoint e a respectiva ancestralidade.
* Validado: testes adequados à alteração foram associados ao SHA.
* Integrado: a alteração foi integrada na branch destino.
* Publicado: o deploy foi confirmado.

Estes estados não são equivalentes. Um commit local não é considerado salvaguardado e um backup não implica aprovação funcional.

## Segurança e rastreabilidade

* Não distribuir a mesma credencial administrativa por executores.
* Preferir identidade e credencial próprias por executor ou aplicação, com privilégio mínimo e possibilidade de revogação.
* Registar bloco, branch, SHA base, SHA final, executor, alterações, validações, falhas e próximo passo.
* Se o remoto avançou, o executor pára, actualiza a leitura e reconcilia por revisão. Não força a referência.
* Alterações de protecções, PR, merge, deploy ou outros efeitos externos mantêm autorização própria quando aplicável.

## Contingência

Bundles Git verificados podem ser usados como salvaguarda portátil adicional. Devem existir fora do clone de trabalho e a recuperação deve ser ensaiada. Worktree, stash ou uma pasta `.git` sincronizada não substituem uma cópia independente.

## QF02, adopção inicial

A adopção deste modelo foi demonstrada na branch `feature/qf02-ux-recovery`:

* checkpoint inicialmente sincronizado: `254f3d06577a0d3153a51e46e672a6e1d3440c11`;
* clone independente Linux recuperou a branch directamente do GitHub;
* os cinco checkpoints QF02 anteriores foram recuperados com ancestralidade válida;
* `git fsck --no-dangling` passou nesse clone;
* existe bundle completo verificado como contingência fora do clone de trabalho.

O próximo objectivo é manter este modelo em todos os blocos QF02 e aplicar o mesmo padrão a novas frentes de desenvolvimento.