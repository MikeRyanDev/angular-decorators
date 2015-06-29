import annotate from '../util/annotate';

export const View = ( options = {} ) => t => {
	annotate(t, '$component');

	if(t.$component.templateUrl)
	{
		delete t.$component.templateUrl;
	}
	if(t.$component.template)
	{
		delete t.$component.template;
	}

	if(options.templateUrl)
	{
		t.$component.templateUrl = options.templateUrl;
	}
	else if(options.template)
	{
		t.$component.template = options.template;
	}
}