
const insertAboutMeSubContent = (divId) => {
    
}

const insertCategorySubContent = (divId, labelArray) => {
  let div = $(`#${divId}`);
  const html = `
        <section id="aside-tags" class="mt-2 mb-4">
            <div class="card">
                <div class="card-header">Categories</div>
              <div class="card-body">      
                    <a rel="32" class="d-inline-block btn btn-sm mb-2 me-1 btn-accent bg-primary text-white" href="/tags/csharp">
                        C#
                    </a>
                    <a rel="18" class="d-inline-block btn btn-sm mb-2 me-1 btn-accent bg-primary text-white" href="/tags/bash">
                        bash
                    </a>
                    <a rel="17" class="d-inline-block btn btn-sm mb-2 me-1 btn-accent bg-primary text-white" href="/tags/linux">
                        Linux
                    </a>
                    <a rel="16" class="d-inline-block btn btn-sm mb-2 me-1 btn-accent bg-primary text-white" href="/tags/dotnet-core">
                        .NET Core
                    </a>
                    <a rel="14" class="d-inline-block btn btn-sm mb-2 me-1 btn-accent bg-primary text-white" href="/tags/azure">
                        Azure
                    </a>
                    <a rel="14" class="d-inline-block btn btn-sm mb-2 me-1 btn-accent bg-primary text-white" href="/tags/aspdotnet-core">
                        ASP.NET Core
                    </a>
                    <a rel="14" class="d-inline-block btn btn-sm mb-2 me-1 btn-accent bg-primary text-white" href="/tags/ubuntu">
                        Ubuntu
                    </a>
                    <a rel="9" class="d-inline-block btn btn-sm mb-2 me-1 btn-accent bg-primary text-white" href="/tags/dotnet">
                        .NET
                    </a>
                    <a rel="9" class="d-inline-block btn btn-sm mb-2 me-1 btn-accent bg-primary text-white" href="/tags/web">
                        Web
                    </a>
                    <a rel="9" class="d-inline-block btn btn-sm mb-2 me-1 btn-accent bg-primary text-white" href="/tags/powershell">
                        PowerShell
                    </a>
                    <a rel="8" class="d-inline-block btn btn-sm mb-2 me-1 btn-accent bg-primary text-white" href="/tags/windows-server">
                        Windows Server
                    </a>
                    
                    <hr>
                    <a class="card-link" href="/tags">
                        <i class="bi-tag me-1"></i>
                        全部标签
                    </a>
                </div>
            </div>
        </section>
        `;
  div.append(html);
};
