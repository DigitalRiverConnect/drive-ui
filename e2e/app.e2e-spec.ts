import { WatchServiceUiBlueprintPage } from './app.po';

describe('watch-service-ui-blueprint App', () => {
  let page: WatchServiceUiBlueprintPage;

  beforeEach(() => {
    page = new WatchServiceUiBlueprintPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
