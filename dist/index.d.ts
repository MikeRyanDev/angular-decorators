
export function Factory(name: string): (any) => void;
export function Inject(...dependencies: string[]): (any) => void;
export function Service(name: string): (any) => void;

export function Component(
	componentConfig: {
		selector: string,
		properties?: string[],
		controllerAs?: string,
    bindings?: any,
    restrict?: string,
    scope?: any,
    bindToController?: boolean
	}
): (any) => void;

export function Directive(
	directiveConfig: {
		selector: string,
		properties?: string[],
		controllerAs?: string,
    bindings?: any,
    restrict?: string,
    scope?: any,
    bindToController?: boolean
	}
): (any) => void;

export function Controller(name: string): (any) => void;

export interface IFilter{
  supports(input: any): boolean;
  transform(input: any, ...params: any[]): any;
}

export function Filter(name: string): (IFilter) => void;

export interface IProvider{
  $get: any;
}

export function Provider(name: string): (IProvider) => void;

export function Animation(classSelector: string): (any) => void;

export function Require(...directiveNames: string[]): (any) => void;

export function View(
  viewConfig: {
    template?: string,
    templateUrl?: string
  }
): (any) => void;

export function Transclude(any): (any) => any;

export interface IModule{
	add(...providers: any[]): IModule;
	config(...providers: any[]): IModule;
	run(...providers: any[]): IModule;
  value(name: string, value: any);
  constant(name: string, value: any);
}

export function Module(name: string, dependencies: any[]): IModule;
