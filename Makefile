
.PHONY: import update update-upstream verify-imports bootstrap-upstream merge-import
# Extra goals are component names only when import is the first goal.
ifeq ($(firstword $(MAKECMDGOALS)),import)
IMPORT_POSITIONAL := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
ifneq ($(words $(IMPORT_POSITIONAL)),0)
ifneq ($(strip $(COMPONENT)$(COMPONENTS)),)
$(error Choose positional components or COMPONENT/COMPONENTS, not both)
endif
IMPORT_NAMES := $(IMPORT_POSITIONAL)
.PHONY: $(sort $(IMPORT_POSITIONAL))
$(sort $(IMPORT_POSITIONAL)): import
	@:
endif
endif
ifneq ($(strip $(COMPONENT)),)
ifneq ($(strip $(COMPONENTS)),)
$(error Choose COMPONENT or COMPONENTS, not both)
endif
endif
IMPORT_NAMES := $(or $(IMPORT_NAMES),$(COMPONENTS),$(COMPONENT))

ARK_DIR = '../ark'
ZAG_DIR = '../zag'

serena:
	uvx --from git+https://github.com/oraios/serena serena start-mcp-server --transport streamable-http --port 9121 --project-from-cwd --context codex

import:
	@test -n "$(IMPORT_NAMES)" || (echo 'Usage: make import <component...>'; exit 1)
	@node scripts/vendor/command.ts $(foreach name,$(IMPORT_NAMES),'$(name)') $(if $(DRY_RUN),--dry-run,)

merge-import:
	@node scripts/vendor/merge.ts $(if $(BRANCH),'$(BRANCH)',)

update update-upstream:
	@ARK_REF="$(or $(ARK_REF),HEAD)" ZAG_REF="$(or $(ZAG_REF),HEAD)" node scripts/vendor/update.ts

bootstrap-upstream:
	@node scripts/vendor/update.ts --bootstrap

verify-imports:
	@node scripts/vendor/import.ts verify
