import { DnAngularPage } from './app.po';

describe('material-dashboard-angular App', () => {
  let page: DnAngularPage;

  beforeEach(() => {
    page = new DnAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
